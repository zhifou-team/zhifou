let baseURL = "http://localhost:8080";

//用于公共复用
function displayQuestionsToHTML(questions) {
    let htmlQuestionsString = '';

    // 数据结构：标题title，用于首页显示的摘要partText,和在看questionStar
    //完整的text，需要在点击阅读全文之后取得。
    questions.forEach(data =>{
        htmlQuestionsString += `
            <div class="page-card">
                <div class="page-card-title" onclick="window.open('zhifou_question.html?'+${data.answerId})">
<!--                 'http://localhost:8080/question/main?answerId=' +-->
<!--                  window.open(window.location.origin+'/question/main?'+)-->
                    <span>${data.questionTitle}</span>
                </div>
                <div class="page-card-text">
                    <div style="display: block" id="pageCardExtraction${data.answerId}">
                        <span onclick="window.location.href='zhifou_question.html?'+${data.answerId}">${data.answerExtraction}</span>
                        <a onclick="cardOperation('displayAnswer',${data.answerId})" class="page-card-text-button">
                        阅读全文 <span class="iconfont icon-xia"></span>
                        </a>
                    </div>
                    <div class="page-card-text-pickUp" style="display: none" id="pageCardTextPickUp${data.answerId}">
                        <span id="pageCardDescription${data.answerId}"></span>
                        <div style="padding-top: 10px">
                            <a onclick="cardOperation('pickUpAnswer',${data.answerId})" class="page-card-text-button">
                                收起全文 <span class="iconfont icon-shang"></span>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="page-card-bottom">
                    <div class="page-card-bottom-reader" style="display: inline-block" onclick="cardOperation('upQuestionLooking',${data.answerId})" id="upQuestionLooking${data.answerId}">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span>在看&nbsp</span><span id="isLooking${data.answerId}">${data.answerStar}</span>
                        </div>
                    </div>
                    <div class="page-card-bottom-reader-already" style="display: none" onclick="cardOperation('downQuestionLooking',${data.answerId})" id="downQuestionLooking${data.answerId}">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span>已在看</span><span id="haveLooked${data.answerId}">${data.answerStar}</span>
                        </div>
                    </div>
                    <div class="page-card-bottom-item" onclick="cardOperation('displayComment',${data.answerId})" data-toggle="modal" data-target="#displayComment">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-pinglun" style="line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span>${data.commentNumber} 条评论</span>
                        </div>
                    </div>
                    <div class="page-card-bottom-item" onclick="cardOperation('shareQuestion',${data.answerId})">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-fenxiang" style="font-size: 18px;line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span style="display: inline-block" id="shareQuestion${data.answerId}">分享</span>
                            <span style="display: none" id="haveShared${data.answerId}">已分享</span>
                        </div>
                    </div>
                    <div class="page-card-bottom-item" onclick="cardOperation('storeQuestion',${data.answerId})">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span style="display: inline-block" id="storeQuestion${data.answerId}">收藏</span>
                            <span style="display: none" id="haveStored${data.answerId}">已收藏</span>
                        </div>
                    </div>
                </div>
                <div class="page-card-comments-content" style="display: none" id="pageCardComments${data.answerId}">
                    <hr>
                    <div class="page-card-comments" id="pageCardComments"></div>
                </div>
            </div>
            `;
    });

    //将cardColumns插入到useToInsert这个div之前
    let insertDiv = document.querySelector(".useToInsert");
    let cardColumns = document.createElement("div");
    cardColumns.className = "page-cards-container";
    cardColumns.innerHTML = htmlQuestionsString;
    insertDiv.parentNode.insertBefore(cardColumns,insertDiv);
}

function displayCommentsToHTML(comments) {
    let htmlCommentsString = '';

    comments.forEach(data =>{
        htmlCommentsString +=`
                <div class="comment-card">
                    <div style="display: table-cell;vertical-align: top">
                        <img src="${data.userImageUrl}" width="24" height="24"  class="comment-card-img">
                    </div>
                    <div style="display: table-cell;vertical-align: top;width: 100%">
                        <div class="d-flex justify-content-between">
                            <div>
                                <span>${data.userNickname}</span>
                            </div>
                            <div>
                                <span class="comment-card-time">${data.updateTime}</span>
                            </div>
                        </div>
                        <div class="comment-card-description">${data.commentDescription}</div>
                        <div>
                            <div class="comment-bottom-item">
                                <div class="d-inline-block align-middle">
                                    <span class="iconfont icon-dianzan-choose" style="font-size: 14px;line-height: 22px"></span>
                                </div>
                                <div class="d-inline-block align-middle">
                                    <span>赞</span>
                                </div>
                            </div>
                            <div class="comment-bottom-item">
                                <div class="d-inline-block align-middle">
                                    <span class="iconfont icon-dislike-full" style="font-size: 12px;line-height: 22px"></span>
                                </div>
                                <div class="d-inline-block align-middle">
                                    <span>踩</span>
                                </div>
                            </div>
                            <div class="comment-bottom-item">
                                <div class="d-inline-block align-middle">
                                    <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 22px"></span>
                                </div>
                                <div class="d-inline-block align-middle">
                                    <span style="display: inline-block" id="storeComment">收藏</span>
                                    <span style="display: none" id="commentStored">已收藏</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
        `
    });

    //将cardColumns插入到useToInsert这个div之前
    let insertDiv = document.getElementById("insertComments");
    let commentColumns = document.createElement("div");
    commentColumns.className = "comment-card-container";
    commentColumns.innerHTML = htmlCommentsString;
    insertDiv.parentNode.insertBefore(commentColumns,insertDiv);

}

let openAnswerCommentKey;
//将对card-text的操作封装起来
function cardOperation(type,id) {
    if (type === "displayAnswer"){

        function displayAnswerDescription(answerId) {

            fetch(baseURL+"/answer/description",{
                method:'post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                },
                body:"answerId="+answerId
            }).then(response=>{
                if (response.ok){
                    return response.json();
                }
            }).then(res=>{
                //后端传来的数据是data后面一个string
                let pageCardDescription = document.getElementById("pageCardDescription"+answerId);
                pageCardDescription.innerHTML = res.data;
            }).catch(function(e){
                zhiFouAlert("error:" + e);
            });

            //隐藏“摘要部分”
            displayThis("block","pageCardExtraction"+answerId);
            //出现“全文部分”
            displayThis("block","pageCardTextPickUp"+answerId);
        }
        displayAnswerDescription(id);

    } else if(type === "pickUpAnswer"){

        function pickUpAnswerDescription(answerId) {
            //隐藏“全文部分”
            displayThis("block","pageCardTextPickUp"+answerId);
            //出现“摘要部分”
            displayThis("block","pageCardExtraction"+answerId);

        }
        pickUpAnswerDescription(id);

    } else if((type === "upQuestionLooking") || (type ==="downQuestionLooking")){

        if (type.substring(0,2) === "up"){

            function upQuestionLooking(answerId) {

                let upStar = {
                    answerId : id,
                    state : "up"
                };

                fetch(baseURL+"/answer/star",{
                    method:'post',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body:JSON.stringify(upStar)
                }).then(response=>{
                    if (response.ok){
                        zhiFouAlert("在看成功！");
                        return response.json();
                    }
                }).then(res=>{
                    let star = document.getElementById("haveLooked"+answerId);
                    star.innerText = res.data;
                    displayThis("i-block","upQuestionLooking"+answerId);
                    displayThis("i-block","downQuestionLooking"+answerId);
                }).catch(function(e){
                    zhiFouAlert("error:" + e);
                });
            }
            upQuestionLooking(id);

        }else {

            function downQuestionLooking(answerId) {

                let downStar = {
                    answerId : id,
                    state : "down"
                };

                fetch(baseURL+"/answer/star",{
                    method:'post',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body:JSON.stringify(downStar)
                }).then(response=>{
                    if (response.ok){
                        zhiFouAlert("取消在看成功！");
                        return response.json();
                    }
                }).then(res=>{
                    let star = document.getElementById("isLooking"+answerId);
                    star.innerText = res.data;
                    displayThis("i-block","downQuestionLooking"+answerId);
                    displayThis("i-block","upQuestionLooking"+answerId);
                }).catch(function(e){
                    zhiFouAlert("error:" + e);
                });
            }
            downQuestionLooking(id);
        }

    }else if(type === "displayComment"){

        function displayComments(answerId) {

            function removeComments(){
                let comments = document.querySelectorAll(".comment-card-container");
                if (comments.length !== 0){
                    for (let i =0; i<comments.length ; i++){
                        comments[i].remove();
                    }
                    // displayThis("block","pageCardMore");
                }
            }
            removeComments();

            let commentRequest = {
                answerId : answerId,
                count : 0
            };

            fetch(
                "http://localhost:3030/comment"
                // baseURL+"/answer/comment",{
                //     method:'post',
                //     headers: {
                //         'content-type': 'application/json'
                //     },
                //     body:JSON.stringify(commentRequest)
                // }
            ).then(response=>{
                if (response.ok){
                    return response.json();
                }
            }).then(res=>{

                let commentList = res.data.commentInfoList;
                let commentNum = commentList.length;

                if (commentNum !== 0){
                    //插入评论
                    displayCommentsToHTML(commentList);
                }else if(commentNum === 0) {
                    zhiFouAlert("没有更多评论了");
                }

                //显示评论的数量
                document.getElementById("commentNumber").innerText = res.data.commentNumber;

            }).then(()=>{

                openAnswerCommentKey = answerId;
                let modalBody = document.querySelector("#modal-body");

                if (eventList !== 0){
                    modalBody.removeEventListener("scroll", displayMoreComments);
                    addEventList("remove");
                }

                modalBody.addEventListener("scroll",displayMoreComments);
                addEventList("add");

            }).catch(function(e){
                zhiFouAlert("error:" + e);
            });

        }
        displayComments(id);

    }

    else if(type === "shareQuestion"){

        function shareQuestion(answerId) {
            //隐藏分享，显示“已分享"
            displayThis("i-block","shareQuestion"+answerId);
            displayThis("i-block","haveShared"+answerId);
        }
        shareQuestion(id);

    }else if(type === "storeQuestion"){

        function storeQuestion(answerId) {
            //隐藏收藏，显示“已收藏”
            displayThis("i-block","storeQuestion"+answerId);
            displayThis("i-block","haveStored"+answerId);
        }
        storeQuestion(id);

    }
}

function displayMoreComments() {

    let modalBody = document.getElementById("modal-body");

    //滚动到底部的判断
    if((modalBody.scrollTop+modalBody.clientHeight)>(modalBody.scrollHeight-300)){

        modalBody.removeEventListener("scroll", displayMoreComments);

        let commentNum = document.querySelectorAll(".comment-card").length;

        let moreRequest = {
            answerId : openAnswerCommentKey,
            count : commentNum
        };

        fetch(
            "http://localhost:3030/comment"
            // baseURL+"/answer/comment",{
            //     method:'post',
            //     headers: {
            //         'content-type': 'application/json'
            //     },
            //     body:JSON.stringify(moreRequest)
            // }
        ).then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{

            let commentList = res.data.commentInfoList;
            let commentsNum = commentList.length;
            if(commentsNum !== 0){
                displayCommentsToHTML(commentList);
                modalBody.addEventListener("scroll", displayMoreComments);
            }else if(commentsNum === 0){
                zhiFouAlert("没有更多评论了");
            }

        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });

    }
}

function createTheComment() {
    if (document.getElementById("create-comment-input").value === '') {
        zhiFouAlert("评论不能为空！")
    } else {

        fetch(baseURL,{
            method:'post',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify(document.getElementById("create-comment-input").value)
        }).then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{

            //在comment-card-container上面插入自己的评论
            let myCommentString = '';

            let insertDiv = document.querySelector("comment-card-container");
            let myComment = document.createElement("div");
            myComment.className = "comment-card-container";
            myComment.innerHTML = myCommentString;
            insertDiv.parentNode.insertBefore(myComment,insertDiv);

            zhiFouAlert("评论成功！");

        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });

    }
}

function questionCreate() {

    let questiont_title = document.getElementById("create-question-title").value;
    let question_description = document.getElementById("create-question-description").value;

    if(questiont_title === ''){
        zhiFouAlert("问题描述不能为空！");
    } else if(questiont_title.length<7){
        zhiFouAlert("试试更长的问题描述！")
    } else {

        let questionInfo = {
            questionTitle:questiont_title,
            questionDescription:question_description
        };

        fetch(baseURL+"/create/question",{
            method:'post',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify(questionInfo)
        }).then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{

            if(res.code === 1){
                zhiFouAlert("问题创建成功！");
            } else {
                zhiFouAlert("问题创建失败！");
            }

        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });
    }
}

function getCookie(cname){
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i<ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name)===0) { return c.substring(name.length,c.length); }
    }
    return "";
}

function setCookie(name,value){
    let d = new Date();
    //设置一天的cookies删除时间
    d.setTime(d.getTime()+(24*60*60*1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = name+"="+value+"; "+expires;
}

//用于注册登陆之后保存用户名密码到cookies
// 改为setUserInfoToCookies()，然后setting_page.js也要修改
function getUserInfo() {

    let userInfo = {
        userUserName:'',
        userPassword:'',
        userNickname:'',
        userDescription:'',
        userImageUrl:''
    };

    fetch(baseURL+"/session/userInfo").then(response =>{
        if(response.ok){
            return response.json();
        }
    }).then(res=>{
        userInfo.userUserName = res.userUserName;
        userInfo.userPassword = res.userPassword;
        userInfo.userNickname = res.userNickname;
        if (!res.userDescription) {
            userInfo.userDescription = res.userDescription;
        }
        if(!res.userImageUrl){
            userInfo.userImageUrl = res.userImageUrl;
        }

    }).catch(function(e){
        zhiFouAlert("error:" + e);
    });

    return userInfo;
}

function displayThis(type,id) {
    let object = document.getElementById(id);

    if (type === "block"){
        if(object.style.display==="none")
        {
            object.style.display="block";
        }
        else
        {
            object.style.display="none";
        }
    } else if (type === "i-block"){
        if(object.style.display==="none")
        {
            object.style.display="inline-block";
        }
        else
        {
            object.style.display="none";
        }
    }

}

function pageSearch() {

    //搜索模块
    let searchWord = document.getElementById("search-input").value;
    if (searchWord !== ""){
        window.open("zhifou_searchInfo.html?search_word="+searchWord);

    } else {
        zhiFouAlert("请输入你想要查找的内容：")
    }

}

let eventList = 0;
function addEventList(type) {
    if (type === "add"){
        eventList+=1;
    } else if(type === "remove"){
        eventList-=1;
    }
}

function zhiFouAlert(text) {
    document.getElementById("content").innerText = text;
    $('#alertModal').toast('show');
    // setTimeout(function () {
    //     $('#alertModal').toast('hide')
    // },3000);
}

function displayWholeSearch(type) {

    let searchInput = document.getElementById("search-input");

    if (type === "click") {
        // searchPart.style.display = "block";
        searchInput.className = "search-input-content-broader";
        document.getElementById("search-bg").className = "page-header-search-bg-hover";

    } else if (type === "close") {
        // searchPart.style.display = "none";
        searchInput.className = "search-input-content-narrower";
        document.getElementById("search-bg").className = "page-header-search-bg";

    }
}

function changeWebState(type,state) {
    if (type === "colorStyle"){

        if(state === "open"){
            if(!document.getElementById("dark-css")){
                let head = document.getElementsByTagName("head")[0];
                let darkCss = document.createElement("link");
                darkCss.rel = "stylesheet";
                darkCss.href = "../static/css/dark_night.css";
                darkCss.id = "dark-css";
                head.appendChild(darkCss);

                document.getElementById("QA-img").src = "../static/img/QAdark.png";
                document.getElementById("open-dark").className = "dark-night-button-press";
                document.getElementById("close-dark").className = "dark-night-button";
                displayHeaderTip('dark-night','pageHeaderDark');
            }
        } else if(state === "close"){
            if(document.getElementById("dark-css")){
                document.getElementById("dark-css").remove();

                document.getElementById("QA-img").src = "../static/img/QA.png";
                document.getElementById("open-dark").className = "dark-night-button";
                document.getElementById("close-dark").className = "dark-night-button-press";
                displayHeaderTip('dark-night','pageHeaderDark');
            }
        }

    } else if(type === "fontStyle"){

        if(state === "songTi"){
            if((!document.getElementById("body").style.fontFamily)
                ||(document.getElementById("body").style.fontFamily === "'pingFang font', serif !important")){
                document.getElementById("body").setAttribute("style","font-family: 'songTi font', serif !important");
                document.querySelectorAll(".page-card-title").forEach(element=>{element.style.fontWeight = "normal"});
                document.getElementById("songTiButton").className = "dark-night-button-press";
                document.getElementById("heiTiButton").className = "dark-night-button";
                displayHeaderTip('dark-night','pageHeaderDark');
            }
        }else if(state === "heiTi"){
            if(document.getElementById("body").style.fontFamily){
                document.getElementById("body").removeAttribute("style");
                document.querySelectorAll(".page-card-title").forEach(element=>{element.style.fontWeight = "bold"});
                document.getElementById("songTiButton").className = "dark-night-button";
                document.getElementById("heiTiButton").className = "dark-night-button-press";
                displayHeaderTip('dark-night','pageHeaderDark')
            }
        }

    }
}

function displayHeaderTip(hidePart,moseoverPart) {
    let hide_part = document.getElementById(hidePart);
    let hoverStyle = document.getElementById(moseoverPart);

    if(hide_part.style.display === "none"){
        hide_part.style.display = "block";

        hoverStyle.style.color = "#1f8dfb";
        hoverStyle.style.borderTop = "4px solid #1f8dfb";
        hoverStyle.style.borderLeft = "1px solid #eeeeee";
        hoverStyle.style.borderRight = "1px solid #eeeeee";
    }else{
        hide_part.style.display = "none";

        hoverStyle.style.color = "#8590a6";
        hoverStyle.style.borderTop = "4px solid transparent";
        hoverStyle.style.borderLeft = "1px solid transparent";
        hoverStyle.style.borderRight = "1px solid transparent";
    }
}