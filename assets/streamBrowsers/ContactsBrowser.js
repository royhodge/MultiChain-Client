// 
// 

groupAdd.addEventListener("click", () => {
    console.log('contacts');
    dom.fadeIn(newGroupModal);
});

const createGroup = () => {
    var groupName = newGroupName.value;
    var groupDetails = newGroupDetails.value;
    console.log(groupName);
    console.log(groupDetails);
};

createGroupBtn.addEventListener("click", () => {
    createGroup();
});

newGroupDetails.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) { //checks whether the pressed key is "Enter"       
        createGroup();
    }
});