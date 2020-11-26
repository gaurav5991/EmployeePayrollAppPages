let employeePayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    employeePayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector('.emp-count').textContent = employeePayrollList.length;
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>StartDate</th><th>Actions</th></tr>";
    let innerHtml = `${headerHtml}`;
    if(employeePayrollList.length == 0) return;
    for(const empPayrollData of employeePayrollList){
        innerHtml = `${innerHtml}
        <tr> 
            <td><img class = "profile" src = "${empPayrollData._profilePic}" alt = ""></td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${stringifyDate(empPayrollData._startDate)}</td>
            <td>
                <img name = "${empPayrollData._id}" src = "../assets/icons/delete-black-18dp.svg" onclick = "remove(this)" alt = "delete">
                <img name = "${empPayrollData._id}" src = "../assets/icons/create-black-18dp.svg" onclick = "update(this)" alt = "edit">
            </td>
        </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}
const getDeptHtml = (deptList) => {
    let deptHtml =``;
    for (const dept of deptList){
        deptHtml = `${deptHtml}<div class = "dept-label">${dept}</div>`;
    }
    return deptHtml;
}

const getEmployeePayrollDataFromStorage = () =>{
    return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const remove = (node) => {
    let employeePayrollData = employeePayrollList.find(empData => empData._id == node._id);
    if(!employeePayrollData) return;
    const index = employeePayrollList.map(empData => empData._id).indexOf(employeePayrollData._id);
    employeePayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
} 

window.addEventListener('DOMContentLoaded', (event) => {
    employeePayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});