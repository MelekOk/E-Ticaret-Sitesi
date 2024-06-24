function search_function() {
    // Arama kutusundan girilen metni al�r ve k���k harfe �evirir
    const query = document.getElementById('search_textbox').value.toLowerCase();
    // Arama sonu�lar�n�n g�sterilece�i konteyner� se�er
    const resultsContainer = document.getElementById('search_result');
    // Arama sonu�lar�n� temizler
    resultsContainer.innerHTML = '';
    // E�er arama kutusu bo� ise fonksiyonu sonland�r�r
    if (query.length === 0) {
        return;
    }
    // Wikipedia API'sine g�nderilecek URL'yi olu�turur. Burada sitemizin i�inde arama yapmak i�in url adresimizi de�i�tirebiliriz.
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;

    // Fetch API'si ile Wikipedia'dan veri �eker
    fetch(url)
        // Gelen veriyi JSON format�na d�n��t�r�r
        .then(response => response.json())
        .then(data => {
            // Wikipedia'dan gelen arama sonu�lar�n� al�r
            const searchResults = data.query.search;
            // E�er hi� sonu� bulunamazsa, kullan�c�ya bilgi verir
            if (searchResults.length === 0) {
                resultsContainer.innerHTML = '<p>Sonuc bulunamadi.</p>';
                return;
            }
            // Her bir arama sonucu i�in HTML i�eri�i olu�turur ve g�sterir
            searchResults.forEach(result => {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'result';
                resultDiv.innerHTML = `
                            <h3>${result.title}</h3>
                            <p>${result.snippet}...</p>
                        `;
                resultsContainer.appendChild(resultDiv);
            });
            // Sayfa �zerinde herhangi bir yere t�klan�nca i�eri�in temizlenmesi
            document.addEventListener('click', () => {
                resultsContainer.innerHTML = '';
            });
        })
        // Hata durumunda konsola hata mesaj� yazd�r�r ve kullan�c�ya bilgi verir
        .catch(error => {
            console.error('Veri cekme hatasi:', error);
            resultsContainer.innerHTML = '<p>Veri al�n�rken hata olustu.</p>';
        });
}

document.addEventListener('DOMContentLoaded', function () {
// JavaScript ile ba�tan sona kayan yaz�y� olu�turma
let container = document.querySelector('.container');
let scrollText = document.getElementById('scroll-text');
let textHeight = scrollText.offsetHeight; // Metnin y�ksekli�i
let containerHeight = container.offsetHeight; // Container'�n y�ksekli�i
let duration = 10; // Animasyon s�resi (saniye)

// Ba�lang��ta metni container'�n y�ksekli�inde ba�lat
scrollText.style.transform = `translateY(${containerHeight}px)`;

// Metni yukar� kayd�rma animasyonu
function animateScroll() {
    scrollText.style.transition = `transform ${duration}s linear`;
    scrollText.style.transform = `translateY(-${textHeight}px)`;

    // Animasyon bitiminde ba�a geri getir
    scrollText.addEventListener('transitionend', function () {
        scrollText.style.transition = 'unset';
        scrollText.style.transform = `translateY(${containerHeight}px)`;

        // Tekrar ba�lat
        setTimeout(animateScroll, 0); // 0 milisaniye gecikme
    });
}

// �lk kayd�rma i�lemini ba�lat
    animateScroll();
});

document.addEventListener('DOMContentLoaded', function () {
    // Statik olarak yerle�tirilmi� blog g�nderileri
    const blogPosts = [
        {
            title: "Nasil Bir E-ticaret Sitesi Kurulur?",
            date: "15 Haziran 2024",
            excerpt: "E-ticaret sitenizi kurarken dikkat etmeniz gereken onemli adimlar...",
            content: "<p>Bu bir �rnek iceriktir.</p><p>E-ticaret sitenizi kurarken dikkat etmeniz gereken adimlar...</p>",
        },
        {
            title: "SEO ipuclari: E-ticarette Arama Motoru Optimizasyonu",
            date: "10 Haziran 2024",
            excerpt: "E-ticaret sitenizin SEO performansini artirmak icin yapabileceginiz stratejiler...",
            content: "<p>Bu bir �rnek iceriktir.</p><p>E-ticaret sitenizin SEO performans�n� art�rmak i�in yapabilece�iniz stratejiler...</p>",
        }
        // Buraya istedi�iniz kadar blog g�nderisi ekleyebilirsiniz
    ];

    const blogPostsContainer = document.getElementById('blog-posts');

    // Her bir blog g�nderisini HTML'e ekleme
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

    // Blog g�nderisi i�eri�ini g�steren fonksiyon
    function showPost(content) {
        const postContentContainer = document.createElement('div');
        postContentContainer.innerHTML = content;

        // Eski i�eri�i temizle ve yeni i�eri�i ekle
        blogPostsContainer.innerHTML = '';
        blogPostsContainer.appendChild(postContentContainer);
    }
});