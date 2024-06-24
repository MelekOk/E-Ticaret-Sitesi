function search_function() {
    // Arama kutusundan girilen metni alýr ve küçük harfe çevirir
    const query = document.getElementById('search_textbox').value.toLowerCase();
    // Arama sonuçlarýnýn gösterileceði konteynerý seçer
    const resultsContainer = document.getElementById('search_result');
    // Arama sonuçlarýný temizler
    resultsContainer.innerHTML = '';
    // Eðer arama kutusu boþ ise fonksiyonu sonlandýrýr
    if (query.length === 0) {
        return;
    }
    // Wikipedia API'sine gönderilecek URL'yi oluþturur. Burada sitemizin içinde arama yapmak için url adresimizi deðiþtirebiliriz.
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;

    // Fetch API'si ile Wikipedia'dan veri çeker
    fetch(url)
        // Gelen veriyi JSON formatýna dönüþtürür
        .then(response => response.json())
        .then(data => {
            // Wikipedia'dan gelen arama sonuçlarýný alýr
            const searchResults = data.query.search;
            // Eðer hiç sonuç bulunamazsa, kullanýcýya bilgi verir
            if (searchResults.length === 0) {
                resultsContainer.innerHTML = '<p>Sonuc bulunamadi.</p>';
                return;
            }
            // Her bir arama sonucu için HTML içeriði oluþturur ve gösterir
            searchResults.forEach(result => {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'result';
                resultDiv.innerHTML = `
                            <h3>${result.title}</h3>
                            <p>${result.snippet}...</p>
                        `;
                resultsContainer.appendChild(resultDiv);
            });
            // Sayfa üzerinde herhangi bir yere týklanýnca içeriðin temizlenmesi
            document.addEventListener('click', () => {
                resultsContainer.innerHTML = '';
            });
        })
        // Hata durumunda konsola hata mesajý yazdýrýr ve kullanýcýya bilgi verir
        .catch(error => {
            console.error('Veri cekme hatasi:', error);
            resultsContainer.innerHTML = '<p>Veri alýnýrken hata olustu.</p>';
        });
}

document.addEventListener('DOMContentLoaded', function () {
// JavaScript ile baþtan sona kayan yazýyý oluþturma
let container = document.querySelector('.container');
let scrollText = document.getElementById('scroll-text');
let textHeight = scrollText.offsetHeight; // Metnin yüksekliði
let containerHeight = container.offsetHeight; // Container'ýn yüksekliði
let duration = 10; // Animasyon süresi (saniye)

// Baþlangýçta metni container'ýn yüksekliðinde baþlat
scrollText.style.transform = `translateY(${containerHeight}px)`;

// Metni yukarý kaydýrma animasyonu
function animateScroll() {
    scrollText.style.transition = `transform ${duration}s linear`;
    scrollText.style.transform = `translateY(-${textHeight}px)`;

    // Animasyon bitiminde baþa geri getir
    scrollText.addEventListener('transitionend', function () {
        scrollText.style.transition = 'unset';
        scrollText.style.transform = `translateY(${containerHeight}px)`;

        // Tekrar baþlat
        setTimeout(animateScroll, 0); // 0 milisaniye gecikme
    });
}

// Ýlk kaydýrma iþlemini baþlat
    animateScroll();
});

document.addEventListener('DOMContentLoaded', function () {
    // Statik olarak yerleþtirilmiþ blog gönderileri
    const blogPosts = [
        {
            title: "Nasil Bir E-ticaret Sitesi Kurulur?",
            date: "15 Haziran 2024",
            excerpt: "E-ticaret sitenizi kurarken dikkat etmeniz gereken onemli adimlar...",
            content: "<p>Bu bir örnek iceriktir.</p><p>E-ticaret sitenizi kurarken dikkat etmeniz gereken adimlar...</p>",
        },
        {
            title: "SEO ipuclari: E-ticarette Arama Motoru Optimizasyonu",
            date: "10 Haziran 2024",
            excerpt: "E-ticaret sitenizin SEO performansini artirmak icin yapabileceginiz stratejiler...",
            content: "<p>Bu bir örnek iceriktir.</p><p>E-ticaret sitenizin SEO performansýný artýrmak için yapabileceðiniz stratejiler...</p>",
        }
        // Buraya istediðiniz kadar blog gönderisi ekleyebilirsiniz
    ];

    const blogPostsContainer = document.getElementById('blog-posts');

    // Her bir blog gönderisini HTML'e ekleme
    blogPosts.forEach(post => {
        const blogPostHTML = `
                <div class="blog-post">
                    <h2>${post.title}</h2>
                    <p class="date">${post.date}</p>
                    <p class="excerpt">${post.excerpt}</p>
                    <a href="#" class="read-more" onclick="showPost('${post.content}')">Devamini Oku</a>
                </div>
            `;
        blogPostsContainer.innerHTML += blogPostHTML;
    });

    // Blog gönderisi içeriðini gösteren fonksiyon
    function showPost(content) {
        const postContentContainer = document.createElement('div');
        postContentContainer.innerHTML = content;

        // Eski içeriði temizle ve yeni içeriði ekle
        blogPostsContainer.innerHTML = '';
        blogPostsContainer.appendChild(postContentContainer);
    }
});