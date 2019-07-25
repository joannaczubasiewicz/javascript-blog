'use strict'; {
    const titleClickHandler = function(event) {
        event.preventDefault();
        const clickedElement = this;

        /* [DONE] remove class 'active' from all article links  */

        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        /* [DONE] add class 'active' to the clicked link */
        clickedElement.classList.add('active');


        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts article.active');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        /* [DONE] get 'href' attribute from the clicked link */
        const articleSelector = clickedElement.getAttribute('href');

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector('.posts ' + articleSelector);

        /* [DONE] add class 'active' to the correct article */
        targetArticle.classList.add('active');
    };

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        /*tytuł pojedynczego posta*/
        optTitleListSelector = '.titles',
        /*lista tytułów postów*/
        optArticleTagsSelector = '.post-tags .list',
        optArticleAuthorSelector = '.post-author',
        optTagsListSelector = '.tags.list',
        optCloudClassCount = 5,
        optCloudClassPrefix = 'tag-size-';




    function generateTitleLinks(customSelector = '') {
        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);

        /* find all the articles and save them to variable: articles */
        const articles = document.querySelectorAll(optArticleSelector + customSelector);
        //console.log(articles);
        //console.log(customSelector);

        let html = '';

        for (let article of articles) {

            /* get the article id */
            const articleId = article.getAttribute('id');

            /* find the title element */
            /* get the title from the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /* create HTML of the link */
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

            /* insert link into html variable */
            html = html + linkHTML;

        }
        titleList.innerHTML = html;


        const links = document.querySelectorAll('.titles a');

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }

    }

    generateTitleLinks();

    function calculateTagsParams(tags) {
        const tagsParams = { 'max': 0, 'min': 999999 };

        for (let tag in tags) {
            if (tagsParams.max < tags[tag]) {
                tagsParams.max = tags[tag];
            }
            if (tagsParams.min > tags[tag]) {
                tagsParams.min = tags[tag];
            }

        }

        return tagsParams;
    }

    function calculateTagClass(count, tagsParams) {

        const normalizedCount = count - tagsParams.min;
        const normalizedMax = tagsParams.max - tagsParams.min;
        const percentage = normalizedCount / normalizedMax;
        const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

        const tagClass = optCloudClassPrefix + classNumber;
        return tagClass;


    }


    function generateTags() {
        /* [NEW] create a new variable allTags with an empty object */
        let allTags = {};

        //allTags.push('dupa');
        //console.log('alltags:', allTags);

        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        //console.log(articles);
        let html = '';
        /* START LOOP: for every article: */
        for (let article of articles) {
            /* find tags wrapper */
            const tagWrapper = article.querySelector(optArticleTagsSelector);


            /* make html variable with empty string */


            /* get tags from data-tags attribute */
            const articleTags = article.getAttribute('data-tags');


            /* split tags into array */
            const articleTagsArray = articleTags.split(' ');


            /* START LOOP: for each tag */
            for (let tag of articleTagsArray) {


                /* generate HTML of the link */
                const linkHTML = '<li><a href="#tag-' + tag + '">' + ' ' + tag + ' ' + '</a></li>';


                /* add generated code to html variable */
                html = html + linkHTML;

                /* [NEW] check if this link is NOT already in allTags */
                if (!allTags.hasOwnProperty(tag)) {
                    /*[NEW] add tag to allTags object*/
                    allTags[tag] = 1;
                } else {
                    allTags[tag]++;
                }
                /* [NEW] add generated code to array allTags
                    allTags.push(linkHTML);*/
                /* END LOOP: for each tag */
            }

            /* insert HTML of all the links into the tags wrapper */
            tagWrapper.innerHTML = html;
            //console.log(tagWrapper);

            /* END LOOP: for every article: */

        }
        /* [NEW] find list of tags in right column */
        const tagList = document.querySelector('.tags');
        // console.log(tagList);

        /* [NEW] add html from allTags to tagList */
        /*tagList.innerHTML = allTags.join(' ');*/

        const tagsParams = calculateTagsParams(allTags);
        //console.log('tagsParams:', tagsParams);

        /*[NEW] create variable for all links HTML code*/
        let allTagsHTML = '';

        //console.log(allTags);
        /*[NEW] START LOOP: for each tag in allTags:*/
        for (let tag in allTags) {

            console.log(tag);
            /*[NEW] generate code of a link and add it to allTaggsHTML*/

            const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
            //allTagsHTML += '<li><a href="#tag-' + tag + ' class="' + tagLinkHTML + '">' + tag + '</a>' + '(' + allTags[tag] + ')</li>';
            allTagsHTML += '<a href="#tag-' + tag + '" class="' + tagLinkHTML + '"> ' + tag + '</a>' /*+'(' + allTags[tag] + ')'*/ ;




            // console.log('taglinkHTML:'+ tagLinkHTML);
            //allTagsHTML += tagLinkHTML;

            console.log(allTagsHTML);

            /*[NEW] END LOOP: for each tag in allTags*/
        }

        /*[NEW] add html from allTaggsHTML to tagList*/
        tagList.innerHTML = allTagsHTML;
        console.log(allTagsHTML);








    }

    generateTags();

    function tagClickHandler(event) {
        /* prevent default action for this event */
        event.preventDefault();

        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        //console.log(clickedElement);

        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');

        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');

        /* find all tag links with class active */
        const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
        //console.log(activeTagLinks);

        /* START LOOP: for each active tag link */
        for (let activeTagLink of activeTagLinks) {
            /* remove class active */
            activeTagLink.classList.remove('active');
            /* END LOOP: for each active tag link */
        }

        /* find all tag links with "href" attribute equal to the "href" constant */
        const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');
        //console.log(hrefTagLinks);

        /* START LOOP: for each found tag link */
        for (let hrefTagLink of hrefTagLinks) {
            /* add class active */
            hrefTagLink.classList.add('active');

            /* END LOOP: for each found tag link */
        }

        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
    }

    function addClickListenersToTags() {
        /* find all links to tags */
        const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
        //console.log(tagLinks);

        /* START LOOP: for each link */
        for (let tagLink of tagLinks) {
            /* add tagClickHandler as event listener for that link */
            tagLink.addEventListener('click', tagClickHandler);
            /* END LOOP: for each link */
        }


    }

    addClickListenersToTags();

    function generateAuthors() {

        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        /* find authors wrapper */
        const authorWrapper = document.querySelector(optArticleAuthorSelector);
        /* make html variable with empty string */
        let html = '';

        /* START LOOP: for every article: */
        for (let article of articles) {

            /* get author from data-author attribute */
            const author = article.getAttribute('data-author');
            //console.log(author);

            const postAuthor = article.querySelector('.post .post-author');
            postAuthor.innerHTML = 'by <a href="#author-' + author + '">' + author + '</a>';

            /* generate HTML of the link */
            const linkHTML = '<li><a href="#author-' + author + '">' + author + '</a></li>';
            //console.log(linkHTML);

            /* add generated code to html variable */
            html = html + linkHTML;
        }


        /* insert HTML of all the links into the tags wrapper */
        authorWrapper.innerHTML = html;

    }
    generateAuthors();

    function authorClickHandler(event) {
        /* prevent default action for this event */
        event.preventDefault();

        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        //console.log(clickedElement);

        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const hrefAuthor = clickedElement.getAttribute('href');

        /* make a new constant "tag" and extract tag from the "href" constant */
        const tagAuthor = hrefAuthor.replace('#author-', '');

        /* find all author links with class active */
        const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
        // console.log(activeAuthorLinks);

        /* START LOOP: for each active tag link */
        for (let activeAuthorLink of activeAuthorLinks) {
            /* remove class active */
            activeAuthorLink.classList.remove('active');
            /* END LOOP: for each active tag link */
        }

        /* find all tag links with "href" attribute equal to the "href" constant */
        const hrefAuthorLinks = document.querySelectorAll('a[href="' + hrefAuthor + '"]');
        //   console.log(hrefAuthorLinks);

        /* START LOOP: for each found author link */
        for (let hrefAuthorLink of hrefAuthorLinks) {
            /* add class active */
            hrefAuthorLink.classList.add('active');

            /* END LOOP: for each found tag link */
        }

        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-author="' + tagAuthor + '"]');

    }

    function addClickListenersToAuthors() {
        /* find all links to authors */
        const authorLinks = document.querySelectorAll('a[href^="#author-"]');
        //   console.log(authorLinks);

        /* START LOOP: for each link */
        for (let authorLink of authorLinks) {
            /* add tagClickHandler as event listener for that link */
            // console.log(authorLink);
            authorLink.addEventListener('click', authorClickHandler);
            /* END LOOP: for each link */




        }
    }
    addClickListenersToAuthors();
}
