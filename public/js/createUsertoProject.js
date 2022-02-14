
const memberName = document.querySelector('#memberNameInput')
const projectName = document.querySelector('#addprojectName')
const addMemberSubmit = document.querySelector('#addMemberSubmit')

const createUserToProject = async (e)=>{
    e.preventDefault();
    const user_id = memberName.value.trim();
    const project_id = projectName.value.trim();

    
    if (user_id && project_id) {
        const response = await fetch('/api/projects/UTR', {
            method: 'POST',
            body: JSON.stringify({ user_id, project_id, }),
            headers: { 'Content-Type': 'application/json' },
        })
        if(response.ok){
            document.location.replace('/users')
        }else{
            alert('Failed to create User to project ')
        }
    }
}


addMemberSubmit.addEventListener('click', createUserToProject)