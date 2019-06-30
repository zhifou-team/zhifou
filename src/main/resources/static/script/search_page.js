// fetch(baseURL+'/search',{
//     method:'post',
//     headers: {
//         "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
//     },
//     body:"searchWord="+searchWord
// }).then(response=>{
//     if (response.ok){
//         console.log("搜索请求成功！");
//         return response.json();
//     }
// }).then(res=>{
//
//     //将左侧移除
//     function removeCards(){
//         let cards = document.querySelectorAll(".page-cards-container");
//         if (cards.length !== 0){
//             for (let i =0; i<cards.length ; i++){
//                 cards[i].remove();
//             }
//             // displayThis("block","pageCardMore");
//         }
//     }
//     removeCards();
//
//     let searchList;
//     searchList = res.data;
//     displayQuestionsToHTML(searchList);
//     insertReadMore();
//
// }).catch(function(e){
//     alert("error:" + e);
// });