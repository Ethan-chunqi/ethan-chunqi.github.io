// 鼠标跟随效果
document.addEventListener('DOMContentLoaded', () => {
    // 创建鼠标跟随元素
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);

    // 更新鼠标跟随位置
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // 添加波纹效果
    document.querySelectorAll('.ripple-effect').forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size/2 + 'px';
            ripple.style.top = e.clientY - rect.top - size/2 + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // 技能卡片3D效果
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // 页面加载动画
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    document.body.appendChild(pageTransition);

    // 添加交互元素效果
    document.querySelectorAll('.interactive-element').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });

    // 为所有链接添加波纹效果类
    document.querySelectorAll('a').forEach(link => {
        link.classList.add('ripple-effect');
    });

    // 为技能卡片添加交互类
    document.querySelectorAll('.skill-card').forEach(card => {
        card.classList.add('interactive-element');
    });
}); 