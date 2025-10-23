// Interactive effects class for ESHRO platform - Professional version
// المؤثرات التفاعلية المحسّنة لمنصة إشرو - نسخة احترافية
class EshroEffects {
  constructor() {
    this.init();
  }

  // init method: Initializes all interactive effects
  // تهيئة المؤثرات
    init() {
    this.initScrollAnimations();
    this.initParticleSystem();
    this.addButtonEffects();
    this.addCardEffects();
  }

  // initScrollAnimations method: Sets up scroll-based animations
  // رسوم متحركة عند التمرير
    initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // إضافة تأثيرات خاصة لعناصر معينة
          if (entry.target.classList.contains('service-card')) {
            this.animateServiceCard(entry.target);
          }
        }
      });
    }, { threshold: 0.1 });

    // مراقبة العناصر المراد تحريكها
    document.querySelectorAll('.fade-in-up, .service-card, .partner-card').forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // animateServiceCard method: Animates service cards on scroll
  // تحريك كارد الخدمة
    animateServiceCard(card) {
    setTimeout(() => {
      card.style.transform = 'translateY(0) scale(1.02)';
      setTimeout(() => {
        card.style.transform = 'translateY(0) scale(1)';
      }, 200);
    }, 100);
  }

  // initParticleSystem method: Creates floating particle background effect
  // نظام الجسيمات المبسط
    initParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      opacity: 0.3;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const particles = [];

    // تحديث حجم الكانفاس
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // إنشاء الجسيمات (عدد أقل للأداء)
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    // تحريك وعرض الجسيمات
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // إعادة تدوير الجسيمات
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // رسم الجسيمة
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }

  // addButtonEffects method: Adds hover and click effects to buttons
  // إضافة تأثيرات بصرية للأزرار (بدون صوت)
    addButtonEffects() {
    document.querySelectorAll('button, .btn').forEach((button) => {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
      });

      button.addEventListener('click', () => {
        button.style.transform = 'translateY(0) scale(0.98)';
        setTimeout(() => {
          button.style.transform = 'translateY(-2px)';
        }, 100);
      });
    });
  }

  // addCardEffects method: Adds hover effects to cards
  // تأثيرات بصرية للكاردات (بدون صوت)
    addCardEffects() {
    document.querySelectorAll('.card, .service-card, .partner-card').forEach((card) => {
      card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.12)';
        card.style.transform = 'translateY(-4px)';
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
        card.style.transform = 'translateY(0)';
      });
    });
  }

  // initServiceHoverEffects method: Adds custom hover effects for services
  // تأثيرات hover مخصصة للخدمات
    initServiceHoverEffects() {
    document.querySelectorAll('.service-item').forEach((service) => {
      service.addEventListener('mouseenter', () => {
        service.style.background = 'linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(34, 197, 94, 0.1))';
        service.style.borderColor = 'rgba(34, 197, 94, 0.3)';
        service.style.transform = 'translateY(-3px) scale(1.01)';
      });

      service.addEventListener('mouseleave', () => {
        service.style.background = '';
        service.style.borderColor = '';
        service.style.transform = 'translateY(0) scale(1)';
      });
    });
  }
}

// تهيئة المؤثرات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  const effects = new EshroEffects();
  
  // إضافة المؤثرات بعد تحميل المحتوى
  setTimeout(() => {
    effects.initServiceHoverEffects();
  }, 1000);

  // جعل الكلاس متاح عالمياً للاستخدام
  window.EshroEffects = effects;
});