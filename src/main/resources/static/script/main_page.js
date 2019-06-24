const baseURL = "http://localhost:8080";

function insertReadMore() {
    //将查看更多推荐插入最后一个card前面
    let insertDiv = document.querySelector(".useToInsert");
    let readMore = document.createElement("div");
    readMore.className = "page-cards-container";
    let htmlReadMoreHTML;
    htmlReadMoreHTML = `
                <div class="page-card-tips" onclick="getInformation('moreLoad')" style="text-align: center;color: #8590a6;cursor: pointer" id="pageCardMore">
                        <div class="page-card-more">
                            <span>点击查看更多</span>
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                     </div>
            </div>
            `;
    readMore.innerHTML = htmlReadMoreHTML;
    insertDiv.parentNode.insertBefore(readMore,insertDiv.nextSibling);
    console.log("插入更多推荐成功");
}

function getInformation(type) {

    if (type === "firstLoad"){

        notifyOperation("navBarChange","nav_recommend");

        fetch(baseURL+'/answer').then(response =>{
            if(response.ok){
                console.log("请求问题列表成功！");
                return response.json();
            }
        }).then( res=>{

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

            let questionList;
            questionList = res.data;
            //对显示数量及数据是否为空进行判断限制
            displayQuestionsToHTML(questionList);
            insertReadMore();
            //cards插入完成后，显示右侧栏
            document.getElementById("pageRightPart").style.display = "block";

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

    } else if(type === ("upQuestionLooking" || "downQuestionLooking")){

        if (type.substring(0,1) === "up"){

            function upQuestionLooking(answerId) {

                fetch(baseURL+"/answer/star",{
                    method:'post',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    },
                    body:("answerId="+answerId)&("state=up")
                }).then(response=>{
                    if (response.ok){
                        console.log("在看成功！");
                        return response.json();
                    }
                }).then(res=>{
                    let star = document.getElementById("haveLooked"+answerId);
                    star.innerText = "已在看"+res.data;
                    displayThis("block","upQuestionLooking"+answerId);
                    displayThis("block","downQuestionLooking"+answerId);
                }).catch(function(e){
                    alert("error:" + e);
                });
            }
            upQuestionLooking(id);

        }else {

            function downQuestionLooking(answerId) {

                fetch(baseURL+"/answer/star",{
                    method:'post',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    },
                    body:("answerId="+answerId)&("state=down")
                }).then(response=>{
                    if (response.ok){
                        console.log("取消在看成功！");
                        return response.json();
                    }
                }).then(res=>{
                    let star = document.getElementById("isLooking"+answerId);
                    star.innerText = "已在看"+res.data;
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

//将导航栏的操作封装起来
function navOperation(type,id) {
    if(type === "displayMyFocus"){

        notifyOperation("navBarChange","nav_focus");

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

        notifyOperation("navBarChange","nav_questions");

        //点击“最新提问” 移除所有其他
        let cards = document.querySelectorAll(".page-cards-container");
        if(cards.length !== 0){
            for (let i =0; i<cards.length; i++){
                cards[i].remove();
            }
        }
    } else if(type === "pageSearch"){

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
}

//右侧通知栏下方的操作封装起来
function notifyOperation(type,id) {
    if (type === "navBarChange"){
        if (id === "nav_recommend"){
            document.getElementById(id).className = "page-header-nav-press";
            document.getElementById("nav_focus").className = "page-header-nav-under";
            document.getElementById("nav_questions").className = "page-header-nav-under";
        } else if (id === "nav_focus"){
            document.getElementById(id).className = "page-header-nav-press";
            document.getElementById("nav_recommend").className = "page-header-nav-under";
            document.getElementById("nav_questions").className = "page-header-nav-under";
        } else if (id === "nav_questions"){
            document.getElementById(id).className = "page-header-nav-press";
            document.getElementById("nav_recommend").className = "page-header-nav-under";
            document.getElementById("nav_focus").className = "page-header-nav-under";
        }
    }
}

