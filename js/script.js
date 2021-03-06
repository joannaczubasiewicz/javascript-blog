'use strict'; {
    const templates = {
        articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
        tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
        authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
        tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-Cloud-link').innerHTML),
        authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML),

    }

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
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list',
        optArticleAuthorSelector = '.authors',
        optTagsListSelector = '.tags.list',
        optCloudClassCount = 5,
        optCloudClassPrefix = 'tag-size-';




    function generateTitleLinks(customSelector = '') {
        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);

        /* find all the articles and save them to variable: articles */
        const articles = document.querySelectorAll(optArticleSelector + customSelector);

        /* make html variable with empty string */
        let html = '';

        for (let article of articles) {

            /* get the article id */
            const articleId = article.getAttribute('id');

            /* find the title element */
            /* get the title from the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /* create HTML of the link */
            //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            const linkHTMLData = { id: articleId, title: articleTitle };
            const linkHTML = templates.articleLink(linkHTMLData);

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

        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);

        /* START LOOP: for every article: */
        for (let article of articles) {

            let html = '';
            /* find tags wrapper */
            const tagWrapper = article.querySelector(optArticleTagsSelector);

            /* get tags from data-tags attribute */
            const articleTags = article.getAttribute('data-tags');


            /* split tags into array */
            const articleTagsArray = articleTags.split(' ');


            /* START LOOP: for each tag */
            for (let tag of articleTagsArray) {
                /* generate HTML of the link */
                //const linkHTML = '<li><a href="#tag-' + tag + '">' + ' ' + tag + ' ' + '</a></li>';
                const linkHTMLData = { id: tag, title: tag };
                const linkHTML = templates.tagLink(linkHTMLData);


                /* add generated code to html variable */
                html = html + linkHTML;

                /* [NEW] check if this link is NOT already in allTags */
                if (!allTags.hasOwnProperty(tag)) {
                    /*[NEW] add tag to allTags object*/
                    allTags[tag] = 1;
                } else {
                    allTags[tag]++;
                }

                /* END LOOP: for each tag */
            }

            /* insert HTML of all the links into the tags wrapper */
            tagWrapper.innerHTML = html;


            /* END LOOP: for every article: */

        }
        /* [NEW] find list of tags in right column */
        const tagList = document.querySelector('.tags');

        /*[NEW] create const tagsParams*/

        const tagsParams = calculateTagsParams(allTags);


        /*[NEW] create variable for all links HTML code*/
        //let allTagsHTML = '';
        const allTagsData = { tags: [] };

        /*[NEW] START LOOP: for each tag in allTags:*/
        for (let tag in allTags) {


            /*[NEW] generate code of a link and add it to allTaggsHTML*/

            const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);

            //allTagsHTML += '<a href="#tag-' + tag + '" class="' + tagLinkHTML + '"> ' + tag + '</a>' /*+'(' + allTags[tag] + ')'*/ ;
            allTagsData.tags.push({
                tag: tag,
                count: allTags[tag],
                className: calculateTagClass(allTags[tag], tagsParams)
            });
            console.log('clasa tagu', calculateTagClass(allTags[tag], tagsParams));

            /*[NEW] END LOOP: for each tag in allTags*/
        }
        console.log('tagi przed chmurą', allTagsData);
        /*[NEW] add html from allTaggsHTML to tagList*/
        //tagList.innerHTML = allTagsHTML;
        tagList.innerHTML = templates.tagCloudLink(allTagsData);
        console.log(templates.tagCloudLink(allTagsData));


        //addClickListenersToTags();

    }

    generateTags();

    function tagClickHandler(event) {
        /* prevent default action for this event */
        event.preventDefault();

        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;

        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');

        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');

        /* find all tag links with class active */
        const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');


        /* START LOOP: for each active tag link */
        for (let activeTagLink of activeTagLinks) {
            /* remove class active */
            activeTagLink.classList.remove('active');
            /* END LOOP: for each active tag link */
        }

        /* find all tag links with "href" attribute equal to the "href" constant */
        const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');


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


        /* START LOOP: for each link */
        for (let tagLink of tagLinks) {
            /* add tagClickHandler as event listener for that link */
            tagLink.addEventListener('click', tagClickHandler);
            /* END LOOP: for each link */
        }


    }

    //addClickListenersToTags();

    function generateAuthors() {

        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        /* find authors wrapper */
        const authorWrapper = document.querySelector(optArticleAuthorSelector);
        /* make html variable with empty string */
        let html = '';

        /* [NEW] create a new variable allAuthors with an empty object */

        const allAuthors = {};

        /* START LOOP: for every article: */
        for (let article of articles) {

            /* get author from data-author attribute */
            const author = article.getAttribute('data-author');
            /*make const postauthor to select author in article */

            const postAuthor = article.querySelector('.post .post-author');
            //postAuthor.innerHTML = 'by <a href="#author-' + author + '">' + author + '</a>';

            const linkHTMLData = { id: author, title: author };
            postAuthor.innerHTML = templates.authorLink(linkHTMLData);

            /* generate HTML of the link */
            const linkHTML = '<li><a href="#author-' + author + '">' + author + '</a></li>';
            //console.log(linkHTML);

            /* add generated code to html variable */
            html = html + linkHTML;

            /* [NEW] check if this link is NOT already in allAuthors */
            if (!allAuthors.hasOwnProperty(author)) {
                /* [NEW] add tag to allAuthors object */
                allAuthors[author] = 1;
            } else {
                allAuthors[author]++;
            }

        }


        /* insert HTML of all the links into the tags wrapper */
        authorWrapper.innerHTML = html;

        /* [NEW] find list of tags in right column */
        const tagList = document.querySelector('.authors');

        /* [NEW] create new variable for all author links HTML code*/
        //let allAuthorsHTML = '';
        const allAuthorsData = { authors: [] };
        

        /*[NEW] start LOOP for each authorTag in allAuthors*/

        for (let author in allAuthors) {
            /*[NEW] generate code of a link and add it to allAuthorsHTML*/
            //allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + '</a></li>' + '(' + allAuthors[author] + ')';
            allAuthorsData.authors.push({
              author: author,
              count: allAuthors[author],
              
            });
            console.log('wtorek authors:', allAuthorsData);
        }

        //authorWrapper.innerHTML = allAuthorsHTML;
        authorWrapper.innerHTML = templates.authorListLink(allAuthorsData);



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
