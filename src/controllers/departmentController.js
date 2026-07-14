const departmentModel = require('../models/departmentModel');
const facultyModel = require('../models/facultyModel');

exports.renderDepartment = async (req, res) => {
    try {
        const deptId = req.params.dept;
        const department = await departmentModel.getDepartmentById(deptId);
        
        if (!department) {
            return res.status(404).render('error', {
                title: 'Department Not Found | AGMRCET',
                message: `The department "${deptId}" was not found. Please verify the URL or navigate via the menu.`
            });
        }
        
        const departmentFaculty = await facultyModel.getFacultyByDepartment(deptId);
        const deptsList = await departmentModel.getDepartmentsList();
        
        res.render('department', {
            title: `${department.name} (${department.shortName}) | AGMRCET`,
            description: `Explore the ${department.name} department at AGMRCET: learn about our labs, HOD message, placements, achievements, and faculty.`,
            department,
            faculty: departmentFaculty,
            depts: deptsList,
            activeDepartments: true
        });
    } catch (error) {
        console.error('Error rendering department:', error);
        res.status(500).render('error', {
            title: 'Internal Server Error | AGMRCET',
            message: 'An error occurred while loading the department page. Please try again later.'
        });
    }
};
