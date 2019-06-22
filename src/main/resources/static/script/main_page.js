const baseURL = "http://localhost:8080/zhifou";

function getInformation(type) { 
    //放在外层用于“查看更多的复用”
    function displayQuestionsToHTML(questions) {
        let htmlQuestionsString = '';

        // 数据结构：标题title，用于首页显示的摘要partText,和在看questionStar
        //完整的text，需要在点击阅读全文之后取得。
        questions.forEach(data =>{
            htmlQuestionsString += `
            <div class="page-card">
                <div class="page-card-title">
                    <span>${data.questionTitle}</span>
                </div>
                <div class="page-card-text">
                    <div style="display: block" id="pageCardExtraction${data.answerId}">
                        <span>${data.answerExtraction}</span>
                        <a onclick="cardOperation('displayAnswer',${data.answerId})" class="page-card-text-button">
                        阅读全文 <i class="fa fa-angle-down" aria-hidden="true"></i> 
                        </a>
                    </div>
                    <div class="page-card-text-pickUp" style="display: none" id="pageCardTextPickUp${data.answerId}">
                        <span id="pageCardDescription${data.answerId}"></span>
                        <div style="padding-top: 10px">
                            <a onclick="cardOperation('pickUpAnswer',${data.answerId})" class="page-card-text-button">
                                收起全文 <i class="fa fa-angle-up" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="page-card-bottom">
                    <div class="page-card-bottom-reader" onclick="cardOperation('addQuestionLooking',${data.answerId})">
                        <div class="d-inline-block align-top">
                            <i class="fas fa-book-reader"></i>
                        </div>
                        <span style="display: inline-block" id="lookQuestion${data.answerId}">在看 ${data.answerStar}</span>
                        <span style="display: none" id="haveLooked${data.answerId}">已在看 ${data.answerStar}</span>
                    </div>
                    <div class="page-card-bottom-item" onclick="cardOperation('displayComments',${data.answerId})">
                        <div class="d-inline-block align-top">
                            <i class="far fa-comment-dots"></i>
                        </div>
                        <span style="display: inline-block" id="downComment${data.answerId}">${data.comment} 条评论</span>
                        <span style="display: none" id="UpComment${data.answerId}">收起评论</span>
                    </div>
                    <div class="page-card-bottom-item" onclick="cardOperation('shareQuestion',${data.answerId})">
                        <div class="d-inline-block align-top">
                            <i class="far fa-share-square"></i>
                        </div>
                        <span style="display: inline-block" id="shareQuestion${data.answerId}">分享</span>
                        <span style="display: none" id="haveShared${data.answerId}">已分享</span>
                    </div>
                    <div class="page-card-bottom-item" onclick="cardOperation('storeQuestion',${data.answerId})">
                        <div class="d-inline-block align-top">
                            <i class="far fa-star"></i>
                        </div>
                        <span style="display: inline-block" id="storeQuestion${data.answerId}">收藏</span>
                        <span style="display: none" id="haveStored${data.answerId}">已收藏</span>
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

    if (type === "firstLoad"){

        fetch(baseURL+'/answer/extraction').then(response =>{
            if(response.ok){
                console.log("请求问题列表成功！");
                return response.json();
            }
        }).then( res=>{

            //将左侧移除
            let cards = document.querySelectorAll(".page-cards-container");
            if (cards.length !== 0){
                for (let i =0; i<cards.length ; i++){
                    cards[i].remove();
                }
                // displayThis("block","pageCardMore");
            }
            console.log("移除成功");

            let questionList;
            questionList = res.data;
            //对显示数量及数据是否为空进行判断限制
            displayQuestionsToHTML(questionList);

            //将查看更多推荐插入最后一个card前面
            let insertDiv = document.querySelector(".useToInsert");
            let readMore = document.createElement("div");
            readMore.className = "page-cards-container";
            let htmlReadMoreHTML;
            htmlReadMoreHTML = `
                <div class="page-card-tips" onclick="getInformation('moreLoad')" style="text-align: center;color: #8590a6;cursor: pointer" id="pageCardMore">
                        <div class="page-card-more">
                            <span>查看更多推荐</span>
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                     </div>
            </div>
            `;
            readMore.innerHTML = htmlReadMoreHTML;
            insertDiv.parentNode.insertBefore(readMore,insertDiv.nextSibling);
            console.log("插入更多推荐成功");

            //cards插入完成后，显示右侧栏
            document.getElementById("pageRightPart").style.display = "block";

        }).catch(function(e){
            alert("error:" + e);
        });

    } else if (type === "moreLoad"){
        //点击阅读更多之后
        fetch(baseURL+'/answer/extraction').then(response =>{
            if(response.ok){
                console.log("请求问题列表成功！");
                return response.json();
            }
        }).then(res =>{
            let questionList;
            questionList = res.data;
            //对显示数量及数据是否为空进行判断限制
            displayQuestionsToHTML(questionList);
        }).catch(function(e){
            alert("error:" + e);
        });
    }
}

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
                    console.log("阅读全文请求成功！");
                    return response.json();
                }
            }).then(res=>{
                //后端传来的数据是data后面一个string
                let pageCardDescription = document.getElementById("pageCardDescription"+answerId);
                pageCardDescription.innerHTML = res.data;
            }).catch(function(e){
                alert("error:" + e);
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

    } else if(type === "addQuestionLooking"){

        function addQuestionLooking(answerId) {
            //
            displayThis("i-block","lookQuestion"+answerId);
            displayThis("i-block","haveLooked"+answerId);
        }
        addQuestionLooking(id);

    }else if(type === "displayComments"){

        function displayComments(answerId){
            displayThis("block","pageCardComments"+answerId);
            //隐藏评论数量，显示“收起评论"
            displayThis("i-block","downComment"+answerId);
            displayThis("i-block","UpComment"+answerId);
        }
        displayComments(id);

    }else if(type === "shareQuestion"){

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

//将导航栏的操作封装起来
function navOperation(type,id) {
    if(type === "displayMyFocus"){

        //点击“我的关注” 移除所有推荐问题
        let cards = document.querySelectorAll(".page-cards-container");
        if(cards.length !== 0){
            for (let i =0; i<cards.length; i++){
                cards[i].remove();
            }
        }

        //判断如果没有关注则插入
        if(true){
            let insertDiv = document.querySelector(".useToInsert");
            let noFocusTip = document.createElement("div");
            noFocusTip.className = "page-cards-container";
            let htmlnoFocusTipHTML;
            htmlnoFocusTipHTML = `
                <div class="page-card-tips" style="text-align: center;color: #8590a6" id="noFocusTip">
                    <div class="page-card-more">
                        <span>您暂时还没有关注，快关注以下推荐内容吧！</span>
                    </div>
                </div>
            `;
            noFocusTip.innerHTML = htmlnoFocusTipHTML;
            insertDiv.parentNode.insertBefore(noFocusTip,insertDiv.nextSibling);
            console.log("插入成功");
        }



    } else if(type === "displayNewQuestions"){
        //点击“最新提问” 移除所有其他
        let cards = document.querySelectorAll(".page-cards-container");
        if(cards.length !== 0){
            for (let i =0; i<cards.length; i++){
                cards[i].remove();
            }
        }
    }
}

//右侧通知栏下方的操作封装起来
function notifiBarOperation(type,id) {

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

function displayStyle(hidePart,moseoverPart) {
    let searchPart = document.getElementById(hidePart);
    let hoverStyle = document.getElementById(moseoverPart);

    if(searchPart.style.display === "none"){
        searchPart.style.display = "block";

        hoverStyle.style.color = "#1f8dfb";
        hoverStyle.style.borderTop = "4px solid #1f8dfb";
        hoverStyle.style.borderLeft = "1px solid #eeeeee";
        hoverStyle.style.borderRight = "1px solid #eeeeee";
    }else{
        searchPart.style.display = "none";

        hoverStyle.style.color = "#8590a6";
        hoverStyle.style.borderTop = "4px solid transparent";
        hoverStyle.style.borderLeft = "1px solid transparent";
        hoverStyle.style.borderRight = "1px solid transparent";
    }
}