const $memberName = document.querySelector('#memberName')
const $projectName = document.querySelector('#addingprojectName')
const $addMemberSubmit = document.querySelector('#inviteMemberButton')
const delRoom =  Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  console.log(delRoom.room)

const updateUserToProject = async (e)=>{
    e.preventDefault();
    const user_id = $memberName.value.trim();
    const project_id = $projectName.value.trim();

    
    if (user_id && project_id) {
        const response = await fetch('/api/projects/UTR', {
            method: 'POST',
            body: JSON.stringify({ user_id, project_id, }),
            headers: { 'Content-Type': 'application/json' },
        })
        if(response.ok){ 
        }else{
            alert('Failed to create User to project ')
        }
    }
}


$addMemberSubmit.addEventListener('click', updateUserToProject)


const $removeButton = document.querySelector('#removeMemberButton')



const removeProject = async(e)=>{
    e.preventDefault();
    const projectId = delRoom.room
    console.log(delRoom.room)
    if(projectId){
        const response = await fetch('/api/projects/DTR', {
            method: 'DELETE',
            body: JSON.stringify({ projectId }),
            headers: { 'Content-Type': 'application/json' },
        })
        if(response.ok){ 
            document.location.replace('/users')
        }else{
            alert('Failed to create User to project ')
        } 
    }
    console.log('hey')
}
$removeButton.addEventListener('click', removeProject)
