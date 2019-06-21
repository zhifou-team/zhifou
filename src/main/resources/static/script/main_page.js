const baseURL = "http://localhost:8080";

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

        let insertDiv = document.getElementById("pageCardMore");

        let cardColumns = document.createElement("div");
        cardColumns.className = "page-cards-container";
        cardColumns.innerHTML = htmlQuestionsString;
        //将cardColumns插入到insertDiv这个div之前
        insertDiv.parentNode.insertBefore(cardColumns,insertDiv);
    }

    if (type === "firstLoad"){

        fetch(baseURL+'/answer').then(response =>{
            if(response.ok){
                console.log("请求问题列表成功！");
                return response.json();
            }
        }).then( res=>{

            let questionList;
            questionList = res.data;
            //对显示数量及数据是否为空进行判断限制
            displayQuestionsToHTML(questionList);

        }).then(function () {

            displayThis("block","pageRightPart");
            displayThis("block","pageCardMore");

        }).catch(function(e){
            alert("error:" + e);
        });

    } else if (type === "secondLoad"){

        fetch(baseURL+'/answer').then(response =>{
            if(response.ok){
                console.log("请求问题列表成功！");
                return response.json();
            }
        }).then( res=>{

            displayThis("block","pageCardMore");
            let cards = document.getElementsByClassName("page-cards-container");
            //点击“我的关注” 移除所有推荐问题
            for (let i =0; i<cards.length ; i++){
                cards[i].remove();
            }
            return res;

        }).then(res =>{

            let questionList;
            questionList = res.data;
            //对显示数量及数据是否为空进行判断限制
            displayQuestionsToHTML(questionList);
            displayThis("block","pageCardMore");

        }).catch(function(e){
            alert("error:" + e);
        });

    } else if (type === "moreLoad"){
        //点击阅读更多之后
        fetch(baseURL+'/answer').then(response =>{
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

        let cards = document.getElementsByClassName("page-cards-container");
        //点击“我的关注” 移除所有推荐问题
        if(cards !== null){
            for (let i =0; i<cards.length ; i++){
                cards[i].remove();
            }
        }
        //移除“更多推荐”
        let cardMore = document.getElementById("pageCardMore");
        if(cardMore !== null) cardMore.remove();

        //判断如果没有focus则显示
        displayThis("block","noFocusTip")

    } else if(type === "displayNewQuestions"){

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