/*
@nswami: This is the taglibrary management module

Phase 2 = make this dynamically plugged in....
*/


var app_SkillTags = new Array("data science","management","analysis","accounting","programming", "measurement science","marketing","finance","skill4","skill5");
var app_RespTags = new Array("data science","management","analysis","accounting","programming", "measurement science","responsibility2","responsibility3","responsibility4","responsibility5");
var app_AspireTags = new Array("data science","management","analysis","accounting","programming", "measurement science","data science","volunteer","mentoring","improve","learn","aspiration3","aspiration4","aspiration5");
//
//// TESTING 
////populateSampleTags(app_SkillTags, "Skill");
////populateSampleTags(app_RespTags, "Responsibility");
////populateSampleTags(app_AspireTags, "Aspire");
// sample tags
function populateSampleTags(arr, tagtitle){
	for (var i=0;i<arr.length;i++){
		arr[i] = "Sample "+tagtitle+" Tag " + i; 
	}
}
//





/*
USEFUL FUNCTIONS!!!
*/

    function removeTagFromObjArray(tag, arr){
      var tempTagArr = new Array();
      for (var i=0;i<arr.length;i++){
        if (arr[i].tagLabel != tag){
          tempTagArr.push(arr[i]);
        }
      }
      return tempTagArr;
    }
   