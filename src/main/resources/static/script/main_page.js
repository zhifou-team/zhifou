const baseURL = "http://localhost:8080";

function getAllInformation() {
    let questionList = [];

    function displayQuestionsToHTML() {
        let htmlQuestionsString = '';

        // 数据结构：标题title，用于首页显示的摘要partText,和在看questionStar
        //完整的text，需要在点击阅读全文之后取得。
        questionList.forEach(data =>{
            htmlQuestionsString += `
            <!--自适应问题;定宽960px-->
            <div class="page-card" style="width: 680px">
                <div class="page-card-title">
                    <span>${data.questionTitle}</span>
                </div>
                <div class="page-card-text" style="display: block" id="pageCardTextDisplay">
                    <div id="pageCardExtraction${data.answerId}" style="display: block">
                        <span>${data.answerExtraction}</span>
                        <a onclick="cardOperation('displayAnswer',${data.answerId})" class="page-card-text-button" id="pageCardDisplay${data.answerId}">
                        阅读全文 <i class="fa fa-angle-down" aria-hidden="true"></i> 
                        </a>
                    </div>
                    <span id="pageCardDescription${data.answerId}" style="display: none"></span>
                </div>
                <div class="page-card-text-pickUp" style="display: none" id="pageCardTextPickUp${data.answerId}">
                    <a onclick="cardOperation('pickUpAnswer',${data.answerId})" class="page-card-text-button">
                        收起全文 <i class="fa fa-angle-up" aria-hidden="true"></i>
                    </a>
                </div>
                <div class="page-card-bottom">
                    <div class="page-card-bottom-reader" onclick="cardOperation('addQuestionLooking',${data.answerId})">
                        <div class="d-inline-block align-top">
                            <i class="fas fa-book-reader"></i>
                        </div>
                        <span>在看 ${data.answerStar}</span>
                    </div>
                    <div class="page-card-bottom-item" onclick="cardOperation('displayComments',${data.answerId})">
                        <div class="d-inline-block align-top">
                            <i class="far fa-comment-dots"></i>
                        </div>
                        <span>2,816 条评论</span>
                    </div>
                    <div class="page-card-bottom-item" onclick="cardOperation('shareQuestion',${data.answerId})">
                        <div class="d-inline-block align-top">
                            <i class="far fa-share-square"></i>
                        </div>
                        <span>分享</span>
                    </div>
                    <div class="page-card-bottom-item" onclick="cardOperation('storeQuestion',${data.answerId})">
                        <div class="d-inline-block align-top">
                            <i class="far fa-star"></i>
                        </div>
                        <span>收藏</span>
                    </div>
                </div>
                
                <div class="page-card-comments-content" style="display: none" id="pageCardComments${data.answerId}">
                    <hr>
                    <div class="page-card-comments" id="pageCardComments"></div>
                </div>
            </div>
            `;
        });

        let cardColumns = document.getElementById("pageCardContainer");
        cardColumns.innerHTML = htmlQuestionsString;

        //解决刚加载还没有fetch完全的时候右侧div已经加载的问题
        displayThis("pageRightPart");
    }

    fetch(baseURL+'/answer/part').then(response =>{
        if(response.ok){
            console.log("请求问题列表成功！");
            return response.json();
        }
    }).then(res =>{
        questionList = res.data;
        //对显示数量及数据是否为空进行判断限制
        displayQuestionsToHTML();
    }).catch(function(e){
        alert("error:" + e);
    });
}

//将对card-text的操作封装起来
function cardOperation(type,id) {
    if (type === "displayAnswer"){

        function displayAnswerDescription(answerId) {

            fetch(baseURL+"/answer/full",{
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
            displayThis("pageCardExtraction"+answerId);
            //出现“全文部分”
            displayThis("pageCardDescription"+answerId);
            //隐藏“阅读全文”
            displayThis("pageCardDisplay"+answerId);
            //出现“收起全文”
            displayThis("pageCardTextPickUp"+answerId);
        }
        displayAnswerDescription(id);

    } else if(type === "pickUpAnswer"){

        function pickUpAnswerDescription(answerId) {
            //隐藏“全文部分”
            displayThis("pageCardDescription"+answerId);
            //出现“摘要部分”
            displayThis("pageCardExtraction"+answerId);
            //隐藏“收起全文”
            displayThis("pageCardTextPickUp"+answerId);
            //出现“阅读全文”
            displayThis("pageCardDisplay"+answerId);
        }
        pickUpAnswerDescription(id);

    } else if(type === "addQuestionLooking"){

        function addQuestionLooking(answerId) {
            alert("功能待完善！");
        }
        addQuestionLooking(id);

    }else if(type === "displayComments"){

        function displayComments(answerId){
            displayThis("pageCardComments"+answerId);
        }
        displayComments(id);

    }else if(type === "shareQuestion"){

        function shareQuestion(answerId) {
            alert("功能待完善！");
        }
        shareQuestion(id);

    }else if(type === "storeQuestion"){

        function storeQuestion(answerId) {
            alert("功能待完善！");
        }
        storeQuestion(id);

    }
}

//将导航栏的操作封装起来
function navOperation(type,id) {

}

//右侧通知栏下方的操作封装起来
function notifiBarOperation(type,id) {

}

function displayThis(id) {
    let object = document.getElementById(id);

    if(object.style.display==="none")
    {
        object.style.display="block";
    }
    else
    {
        object.style.display="none";
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