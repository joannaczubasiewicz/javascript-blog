'use strict'; {
    const titleClickHandler = function(event) {
        event.preventDefault();
        const clickedElement = this;
        console.log('Link was clicked!');


        /* [DONE] remove class 'active' from all article links  */

        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        /* [DONE] add class 'active' to the clicked link */
        console.log('clickedElement:', clickedElement);
        clickedElement.classList.add('active');


        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts article.active');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        /* [DONE] get 'href' attribute from the clicked link */
        const articleSelector = clickedElement.getAttribute('href');
        console.log(articleSelector);

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector('.posts ' + articleSelector);
        console.log(targetArticle);

        /* [DONE] add class 'active' to the correct article */
        targetArticle.classList.add('active');

    }

    /*const links = document.querySelectorAll('.titles a');
    console.log(links);
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }*/

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        /*tytuł pojedynczego posta*/
        optTitleListSelector = '.titles'; /*lista tytułów postów*/

    /*function generateTitleLinks() {

        //remove contents of titleList 
        const titleList = document.querySelector(optTitleListSelector);
        console.log(titleList);
        titleList.innerHTML = '';

        // for each article 
        const articles = document.querySelectorAll(optArticleSelector);
        for (let article of articles) {


            // get the article id 

            const articleId = article.getAttribute('id');
            console.log(articleId);

            // find the title element 
            // get the title from the title element 

            const articleTitle = article.querySelector(optTitleSelector).innerHTML;


            // create HTML of the link 
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            console.log(linkHTML);

            // insert link into titleList 

            //ćwiczenie z insertAdjacentHTML
            //titleList.insertAdjacentHTML('afterend', linkHTML);

        }

    }*/
    function generateTitleLinks() {
        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        //console.log(titleList);

        /* find all the articles and save them to variable: articles */
        let articles = document.querySelectorAll(optArticleSelector);

        let html = '';

        for (let article of articles) {

            /* get the article id */
            const articleId = article.getAttribute('id');
            //console.log(articleId);

            /* find the title element */
            /* get the title from the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /* create HTML of the link */
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            //console.log(linkHTML);


            /* insert link into html variable */
            html = html + linkHTML;



        }
        titleList.innerHTML = html;


        const links = document.querySelectorAll('.titles a');
        console.log(links);
        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }

    }

    generateTitleLinks();
}