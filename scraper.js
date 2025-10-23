// Product scraper script for ESHRO platform - Scrapes product data from pretty.ezone.ly
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function getProductUrls() {
  try {
    const response = await fetch('https://pretty.ezone.ly/products?cat=%D8%A7%D9%84%D9%83%D9%84');
    const html = await response.text();
    const $ = cheerio.load(html);

    const urls = [];
    $('.product-item a, .product-link').each((i, link) => {
      const href = $(link).attr('href');
      if (href && href.includes('product') && !urls.includes(href)) {
        urls.push(href.startsWith('http') ? href : 'https://pretty.ezone.ly' + href);
      }
    });

    // If no links found, try different selectors
    if (urls.length === 0) {
      $('a[href*="product"]').each((i, link) => {
        const href = $(link).attr('href');
        if (href && !urls.includes(href)) {
          urls.push(href.startsWith('http') ? href : 'https://pretty.ezone.ly' + href);
        }
      });
    }

    return urls.slice(0, 20); // Limit to 20 products
  } catch (error) {
    console.error('Error getting product URLs:', error);
    return [];
  }
}

async function scrapeProduct(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract product name - try multiple selectors
    const name = $('.product-title').text().trim() ||
                  $('.product-name').text().trim() ||
                  $('h1').first().text().trim() ||
                  $('title').text().trim() ||
                  'Unknown Product';

    // Extract description
    const description = $('.product-description').text().trim() ||
                        $('.description').text().trim() ||
                        $('.product-details').text().trim() ||
                        $('meta[name="description"]').attr('content') ||
                        '';

    // Extract prices - look for price elements
    const priceElement = $('.product-price').text().trim() ||
                         $('.price').text().trim() ||
                         $('.current-price').text().trim() ||
                         $('.price-current').text().trim();

    const originalPriceElement = $('.original-price').text().trim() ||
                                 $('.old-price').text().trim() ||
                                 $('.price-old').text().trim() ||
                                 priceElement;

    const price = parseFloat(priceElement.replace(/[^\d.]/g, '')) || 0;
    const originalPrice = parseFloat(originalPriceElement.replace(/[^\d.]/g, '')) || price;

    // Extract images
    const images = [];
    $('.product-images img, .product-gallery img, .product-image img, .gallery img').each((i, img) => {
      const src = $(img).attr('src') || $(img).attr('data-src') || $(img).attr('data-lazy-src');
      if (src && (src.includes('product') || src.includes('pretty') || src.includes('ezone'))) {
        images.push(src.startsWith('http') ? src : 'https://pretty.ezone.ly' + src);
      }
    });

    // If no images found, try all img tags
    if (images.length === 0) {
      $('img').each((i, img) => {
        const src = $(img).attr('src') || $(img).attr('data-src') || $(img).attr('data-lazy-src');
        if (src && src.length > 10 && !src.includes('logo') && !src.includes('icon') && !src.includes('banner')) {
          images.push(src.startsWith('http') ? src : 'https://pretty.ezone.ly' + src);
        }
      });
    }

    // Sizes - for cosmetics, might be different
    const sizes = ['واحد']; // Cosmetics usually single size

    // Colors - for makeup shades
    const colors = [
      { name: 'طبيعي', value: '#F5DEB3' },
      { name: 'وردي فاتح', value: '#FFB6C1' },
      { name: 'وردي', value: '#FFC0CB' },
      { name: 'أحمر', value: '#FF0000' },
      { name: 'أحمر داكن', value: '#8B0000' },
      { name: 'برونزي', value: '#CD853F' },
      { name: 'بني', value: '#A52A2A' },
      { name: 'بني داكن', value: '#654321' },
      { name: 'أسود', value: '#000000' },
      { name: 'رمادي', value: '#808080' },
      { name: 'أزرق', value: '#0000FF' },
      { name: 'أخضر', value: '#008000' }
    ];

    // Rating - try to extract if available
    const ratingText = $('.rating').text().trim() || $('.stars').text().trim();
    const rating = parseFloat(ratingText.match(/(\d+(\.\d+)?)/)?.[0]) || 4.5;

    // Reviews
    const reviewsText = $('.reviews-count').text().trim() || $('.reviews').text().trim();
    const reviews = parseInt(reviewsText.match(/(\d+)/)?.[0]) || 10;

    // Other fields
    const views = 100;
    const likes = 20;
    const orders = 5;

    // Availability - make first 3 unavailable
    const index = urls.indexOf(url);
    const inStock = index >= 3 && !html.toLowerCase().includes('out of stock') &&
                    !html.toLowerCase().includes('غير متوفر') &&
                    !html.toLowerCase().includes('unavailable');

    return {
      name: name || 'Unknown Product',
      description: description || 'No description available',
      price: price || 0,
      originalPrice: originalPrice || price || 0,
      images: images.length > 0 ? images : ['/assets/sheirine/placeholder.jpg'],
      sizes,
      availableSizes: sizes,
      colors,
      rating,
      reviews,
      views,
      likes,
      orders,
      category: 'منتجات تجميل',
      inStock,
      isAvailable: inStock,
      tags: ['جديد', 'مكياج', 'عناية'],
      badge: 'جديد'
    };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return null;
  }
}

async function main() {
  const urls = await getProductUrls();
  console.log(`Found ${urls.length} product URLs`);
  const products = [];
  for (const url of urls) {
    console.log(`Scraping ${url}`);
    const product = await scrapeProduct(url);
    if (product) {
      products.push(product);
    }
    await new Promise(resolve => setTimeout(resolve, 1000)); // Delay to avoid rate limiting
  }

  fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
  console.log('Scraping complete. Products saved to products.json');
}

main();