const baseURL = "http://localhost:8080";

//用于公共复用
function displayQuestionsToHTML(questions) {
    let htmlQuestionsString = '';

    // 数据结构：标题title，用于首页显示的摘要partText,和在看questionStar
    //完整的text，需要在点击阅读全文之后取得。
    questions.forEach(data =>{
        htmlQuestionsString += `
            <div class="page-card">
                <div class="page-card-title" onclick="window.location.href='zhifou_question.html?answerId='+${data.answerId}">
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
                    <div class="page-card-bottom-reader" style="display: none" onclick="cardOperation('downQuestionLooking',${data.answerId})" id="downQuestionLooking${data.answerId}">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span>已在看</span><span id="haveLooked${data.answerId}">${data.answerStar}</span>
                        </div>
                    </div>
                    <div class="page-card-bottom-item" onclick="cardOperation('displayComments',${data.answerId})">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-pinglun" style="line-height: 16px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span style="display: inline-block" id="downComment${data.answerId}">${data.comment} 条评论</span>
                            <span style="display: none" id="UpComment${data.answerId}">收起评论</span>
                        </div>
                    </div>
                    <div class="page-card-bottom-item" onclick="cardOperation('shareQuestion',${data.answerId})">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-fenxiang" style="font-size: 18px;line-height: 18px"></span>
                        </div>
                        <div class="d-inline-block align-middle">
                            <span style="display: inline-block" id="shareQuestion${data.answerId}">分享</span>
                            <span style="display: none" id="haveShared${data.answerId}">已分享</span>
                        </div>
                    </div>
                    <div class="page-card-bottom-item" onclick="cardOperation('storeQuestion',${data.answerId})">
                        <div class="d-inline-block align-middle">
                            <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 18px"></span>
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

    } else if(type === ("upQuestionLooking" || "downQuestionLooking")){

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
                        console.log("在看成功！");
                        return response.json();
                    }
                }).then(res=>{
                    let star = document.getElementById("haveLooked"+answerId);
                    star.innerText = res.data;
                    displayThis("i-block","upQuestionLooking"+answerId);
                    displayThis("i-block","downQuestionLooking"+answerId);
                }).catch(function(e){
                    alert("error:" + e);
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
                        console.log("取消在看成功！");
                        return response.json();
                    }
                }).then(res=>{
                    let star = document.getElementById("isLooking"+answerId);
                    star.innerText = res.data;
                    displayThis("i-block","downQuestionLooking"+answerId);
                    displayThis("i-block","upQuestionLooking"+answerId);
                }).catch(function(e){
                    alert("error:" + e);
                });
            }
            downQuestionLooking(id);
        }



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
    let searchWord = document.getElementById("page_search_input").value;
    if (searchWord !== ""){

        fetch(baseURL+'/search',{
            method:'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            body:"searchWord="+searchWord
        }).then(response=>{
            if (response.ok){
                console.log("搜索请求成功！");
                return response.json();
            }
        }).then(res=>{

            //将左侧移除
            function removeCards(){
                let cards = document.querySelectorAll(".page-cards-container");
                if (cards.length !== 0){
                    for (let i =0; i<cards.length ; i++){
                        cards[i].remove();
                    }
                    // displayThis("block","pageCardMore");
                }
            }
            removeCards();

            let searchList;
            searchList = res.data;
            displayQuestionsToHTML(searchList);
            insertReadMore();

        }).catch(function(e){
            alert("error:" + e);
        });

    } else {
        alert("请输入你想要查找的内容：")
    }

}

function displayWholeSearch() {

    function displaySearchStyle(){
        let searchPart = document.getElementById("searchPart");
        let hoverStyle = document.getElementById("pageHeaderSearch");

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
    displaySearchStyle();
}

function displayUser(hidePart,moseoverPart) {
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