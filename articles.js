/**
 * 文章列表页面功能
 * 当页面加载完成后，从localStorage中获取文章数据
 * 并将文章渲染成卡片形式展示在网格布局中
 * 每个卡片包含标题、摘要、发布日期和标签
 * 点击卡片可跳转到对应的文章详情页
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面加载完成');
    
    const articlesGrid = document.getElementById('articles-grid');
    console.log('文章容器元素:', articlesGrid);
    
    if (!articlesGrid) {
        console.error('找不到文章容器元素');
        return;
    }

    // 定义文章数据
    const articles = [
        {
            title: "理解 meme，理解加密货币",
            excerpt: "在加密货币中从业的这段时间，似乎每天都在和 Meme 打交道，从 BRC-20 的 ORDI、SATS，再到马斯克背书的狗狗币（Doge）、Troll（巨魔）...",
            date: "2024-01-20",
            author: "刘春起",
            tags: ["区块链", "加密货币", "Meme"],
            category: "区块链",
            link: "articles/meme.html"
        },
        {
            title: "越买不起的房子的时候，越要贷款买最贵的房子",
            excerpt: "标题似乎有些标题党，原话应该是几年前博鳌论坛楼市分论坛中，金融研究所院长，首席经济学家管清友先生的一句话...",
            date: "2024-04-18",
            author: "刘春起",
            tags: ["经济", "房地产", "投资"],
            category: "投资",
            link: "articles/house.html"
        },
        {
            title: "RWA 第一公链 MANTRA($OM) 什么来头？年初至今默默上涨近百倍",
            excerpt: "在加密货币市场中，MANTRA($OM)以其独特的定位和惊人的涨幅引起了广泛关注。作为RWA（Real World Assets）赛道的第一公链...",
            date: "2024-01-09",
            author: "刘春起",
            tags: ["区块链", "加密货币", "投资"],
            category: "区块链",
            link: "articles/mantra.html"
        },
        {
            title: "关于 23 年来：对投资、缠中说缠以及快乐人生的一些感悟",
            excerpt: "2023年是一个特殊的年份，市场的起起落落给了我们很多思考的机会。在这一年里，我对投资、《缠中说禅》以及人生有了一些新的认识和感悟...",
            date: "2024-01-10",
            author: "刘春起",
            tags: ["投资", "人生", "感悟"],
            category: "感悟",
            link: "articles/investment.html"
        },
        {
            title: "一周感悟：关于交易、Hyperliquid、Usual、无风险利率、泰国、缠论，财务投资人...",
            excerpt: "这一周发生的事情实在太多，与其说发生的不如说\"思考\"的方面又多又杂，新奇的事物一个接一个的出来...",
            date: "2024-01-14",
            author: "刘春起",
            tags: ["交易", "投资", "感悟"],
            category: "交易",
            link: "articles/trading.html"
        },
        {
            title: "你得学会观察河流，而不是站在河中央",
            excerpt: "2010 年，互联网迎来爆发式增长，我站在河流中见证了太多的时代弄潮儿：从加密市场的中本聪、股市的徐翔、桑田路、北京吵架...",
            date: "2024-01-23",
            author: "刘春起",
            tags: ["投资", "思考", "市场观察"],
            category: "投资",
            link: "articles/river.html"
        },
        {
            title: "经济学学得越好，反而越赚不到钱？",
            excerpt: "最近又受到了极大的刺激：有一位专门做投资的朋友，在如此落寞的经济大环境下，默默地实现了财富自由，并在上海购置了一套奢华的别墅...",
            date: "2024-02-22",
            author: "刘春起",
            tags: ["经济学", "投资", "套利"],
            category: "经济",
            link: "articles/economics.html"
        },
        {
            title: "Ethan 的区块链观察 Ⅱ：矿工与房东",
            excerpt: "近段时间对于我个人而言，信息量过于密集：香港物价 + Web3 之旅，甘肃天水麻辣烫网红城市爆火，矿工驱动的 Solana & Base 上金狗频出...",
            date: "2024-01-05",
            author: "刘春起",
            tags: ["区块链", "市场观察", "投资分析"],
            category: "区块链",
            link: "articles/blockchain.html"
        }
    ];

    // 按日期降序排序文章
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 获取所有唯一的分类
    const categories = ['全部', ...new Set(articles.map(article => article.category))];

    // 创建分类过滤器
    const categoryFiltersHTML = categories.map(category => 
        `<button class="category-filter ${category === '全部' ? 'active' : ''}" data-category="${category}">
            ${category}
        </button>`
    ).join('');

    // 在文章网格之前插入分类过滤器
    articlesGrid.insertAdjacentHTML('beforebegin', `
        <div class="category-filters">
            ${categoryFiltersHTML}
        </div>
    `);

    // 格式化日期函数
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year} 年 ${month} 月 ${day} 日`;
    }

    // 添加分类过滤器的点击事件
    document.querySelectorAll('.category-filter').forEach(filter => {
        filter.addEventListener('click', () => {
            // 更新活动状态
            document.querySelectorAll('.category-filter').forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            // 获取选中的分类
            const selectedCategory = filter.dataset.category;

            // 过滤并渲染文章
            renderArticles(selectedCategory === '全部' ? articles : articles.filter(article => 
                article.category === selectedCategory
            ));
        });
    });

    // 渲染文章函数
    function renderArticles(articlesToRender) {
        const articlesHTML = articlesToRender.map(article => {
            console.log('正在处理文章:', article.title);
            
            return `
                <article class="article-card" onclick="window.location.href='${article.link}'">
                    <div class="article-category">${article.category}</div>
                    <div class="article-content">
                        <h2 class="article-title">${article.title}</h2>
                        <p class="article-excerpt">${article.excerpt}</p>
                        <div class="article-meta">
                            <div class="meta-left">
                                <span class="article-date">${formatDate(article.date)}</span>
                                <span class="meta-divider">·</span>
                                <div class="article-tags">
                                    ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        // 添加打赏部分
        const donationHTML = `
            <div class="donation-section">
                <h3 class="donation-title">支持作者</h3>
                <p class="donation-text">如果这些文章对你有帮助，欢迎打赏支持我继续创作。您的支持是我持续写作的动力。</p>
                <div class="wallet-container">
                    <div class="wallet-label">BSC 链收款地址</div>
                    <div class="wallet-address" onclick="copyWalletAddress(this)">
                        0x414158fc309c2ecd2c603ef947e96bcb0cfcc074
                        <div class="copy-icon"></div>
                    </div>
                </div>
            </div>
            <div class="copied-message">BSC 地址已复制到剪贴板</div>
        `;

        articlesGrid.innerHTML = articlesHTML + donationHTML;
    }

    // 复制钱包地址功能
    window.copyWalletAddress = function(element) {
        const address = element.textContent.trim();
        navigator.clipboard.writeText(address).then(() => {
            const message = document.querySelector('.copied-message');
            message.classList.add('show');
            
            // 添加动画效果
            element.style.transform = 'scale(0.95)';
            setTimeout(() => {
                element.style.transform = 'translateY(-2px)';
            }, 100);

            setTimeout(() => {
                message.classList.remove('show');
                element.style.transform = '';
            }, 2000);
        }).catch(err => {
            console.error('复制失败:', err);
        });
    };

    // 初始渲染所有文章
    renderArticles(articles);
});