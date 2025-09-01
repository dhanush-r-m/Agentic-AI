// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const header = document.getElementById('header');
const dashboardContainer = document.getElementById('dashboardContainer');
const roleButtons = document.querySelectorAll('.role-btn');
const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');
const userRole = document.getElementById('userRole');
const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
const contentSections = document.querySelectorAll('.content-section');
const notificationContainer = document.getElementById('notificationContainer');
const editStudentForm = document.getElementById('editStudentForm');

// Global Variables
let currentUser = null;
let currentRole = null;
const API_BASE_URL = 'http://localhost:3000'; // Should match your backend URL

// Sample Data (in a real app, this would come from API calls)
const sampleGrades = [
    { subject: 'Mathematics', test1: 88, test2: 92, assignment: 85, finalExam: 90, overall: 89, grade: 'A' },
    { subject: 'Science', test1: 85, test2: 88, assignment: 92, finalExam: 87, overall: 88, grade: 'A' },
    { subject: 'English', test1: 78, test2: 82, assignment: 80, finalExam: 85, overall: 81, grade: 'B' },
    { subject: 'History', test1: 90, test2: 88, assignment: 95, finalExam: 92, overall: 91, grade: 'A+' }
];

const sampleTimetable = [
    { time: '9:00-9:45', monday: 'Mathematics', tuesday: 'Science', wednesday: 'English', thursday: 'Mathematics', friday: 'Science' },
    { time: '9:45-10:30', monday: 'Science', tuesday: 'English', wednesday: 'Mathematics', thursday: 'Science', friday: 'English' },
    { time: '10:45-11:30', monday: 'English', tuesday: 'Mathematics', wednesday: 'Science', thursday: 'English', friday: 'Mathematics' },
    { time: '11:30-12:15', monday: 'History', tuesday: 'Physical Ed', wednesday: 'History', thursday: 'Art', friday: 'Physical Ed' }
];

const sampleAttendance = [
    { date: '2024-03-15', status: 'Present', period1: '✓', period2: '✓', period3: '✓', period4: '✓' },
    { date: '2024-03-14', status: 'Present', period1: '✓', period2: '✓', period3: '✓', period4: '✓' },
    { date: '2024-03-13', status: 'Absent', period1: '✗', period2: '✗', period3: '✗', period4: '✗' }
];

const sampleAssignments = [
    { subject: 'Mathematics', assignment: 'Algebra Problems', dueDate: '2024-04-10', status: 'Submitted', grade: 'A' },
    { subject: 'Science', assignment: 'Lab Report', dueDate: '2024-04-15', status: 'Pending', grade: '-' },
    { subject: 'English', assignment: 'Book Review', dueDate: '2024-04-05', status: 'Submitted', grade: 'B+' }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in (from sessionStorage)
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        currentRole = sessionStorage.getItem('currentRole');
        showDashboard();
    }
    
    // Set up event listeners
    setupEventListeners();
    
    // Load sample data (in a real app, this would be API calls)
    loadSampleData();
});

// Set up event listeners
function setupEventListeners() {
    // Role selection buttons
    roleButtons.forEach(button => {
        button.addEventListener('click', () => {
            roleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentRole = button.getAttribute('data-role');
        });
    });
    
    // Sidebar navigation
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            
            // Update active state
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show corresponding section
            showSection(sectionId);
        });
    });
    
    // Edit student form submission
    if (editStudentForm) {
        editStudentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            updateStudentProfile();
        });
    }
}

// Login function
async function login() {
    if (!currentRole) {
        showNotification('Please select your role', 'error');
        return;
    }
    
    try {
        // In a real app, you would make an API call to authenticate
        // For demo purposes, we'll simulate a login with mock data
        
        let userData = {};
        let endpoint = '';
        
        // Based on role, set mock user data and API endpoint
        switch(currentRole) {
            case 'admin':
                userData = {
                    id: 'admin001',
                    name: 'Admin User',
                    email: 'admin@school.edu',
                    role: 'Administrator',
                    permissions: ['all']
                };
                endpoint = '/auth/login';
                break;
            case 'teacher':
                userData = {
                    id: 'teacher001',
                    name: 'John Smith',
                    email: 'john.smith@school.edu',
                    role: 'Teacher',
                    subjects: ['Mathematics', 'Physics'],
                    classTeacher: 'Grade 10'
                };
                endpoint = '/auth/login';
                break;
            case 'student':
                userData = {
                    id: 'student001',
                    name: 'Alice Johnson',
                    email: 'alice.johnson@school.edu',
                    role: 'Student',
                    class: 'Grade 10',
                    rollNumber: 'ST001',
                    fatherName: 'Robert Johnson',
                    motherName: 'Mary Johnson',
                    phone: '+1234567890',
                    dob: '2008-05-15'
                };
                endpoint = '/auth/login';
                break;
            case 'parent':
                userData = {
                    id: 'parent001',
                    name: 'Robert Johnson',
                    email: 'robert.johnson@email.com',
                    role: 'Parent',
                    wards: ['student001']
                };
                endpoint = '/auth/login';
                break;
        }
        
        // In a real app, you would make an API call like this:
        /*
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'user@example.com',
                password: 'password',
                role: currentRole
            })
        });
        
        if (!response.ok) {
            throw new Error('Login failed');
        }
        
        const data = await response.json();
        currentUser = data.user;
        */
        
        // For demo, we'll use the mock data
        currentUser = userData;
        
        // Store user in session
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        sessionStorage.setItem('currentRole', currentRole);
        
        showDashboard();
        showNotification('Login successful!', 'success');
        
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Login failed. Please try again.', 'error');
    }
}

// Logout function
function logout() {
    // In a real app, you would make an API call to logout
    /*
    try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
    } catch (error) {
        console.error('Logout error:', error);
    }
    */
    
    // Clear session
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentRole');
    
    // Reset UI
    currentUser = null;
    currentRole = null;
    
    // Show login screen
    loginScreen.style.display = 'flex';
    header.style.display = 'none';
    dashboardContainer.style.display = 'none';
    
    showNotification('Logged out successfully', 'success');
}

// Show dashboard based on user role
function showDashboard() {
    loginScreen.style.display = 'none';
    header.style.display = 'block';
    dashboardContainer.style.display = 'block';
    
    // Update user info in header
    userName.textContent = currentUser.name;
    userRole.textContent = currentUser.role;
    userAvatar.textContent = currentUser.name.charAt(0);
    
    // Show the appropriate dashboard based on role
    document.querySelectorAll('.dashboard').forEach(dash => {
        dash.classList.remove('active');
    });
    
    const dashboardId = `${currentRole}Dashboard`;
    const dashboard = document.getElementById(dashboardId);
    if (dashboard) {
        dashboard.classList.add('active');
        
        // Show the first section by default
        const firstSectionLink = dashboard.querySelector('.sidebar-menu a');
        if (firstSectionLink) {
            const firstSectionId = firstSectionLink.getAttribute('data-section');
            showSection(firstSectionId);
        }
    }
    
    // Load data for the current role
    loadDashboardData();
}

// Show specific content section
function showSection(sectionId) {
    // Hide all content sections
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the requested section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
        
        // Load data for this section if needed
        loadSectionData(sectionId);
    }
}

// Load sample data (in a real app, this would be API calls)
function loadSampleData() {
    // Populate grades table
    const gradesTableBody = document.querySelector('#gradesTable tbody');
    if (gradesTableBody) {
        gradesTableBody.innerHTML = sampleGrades.map(grade => `
            <tr>
                <td><strong>${grade.subject}</strong></td>
                <td>${grade.test1}</td>
                <td>${grade.test2}</td>
                <td>${grade.assignment}</td>
                <td>${grade.finalExam}</td>
                <td>${grade.overall}%</td>
                <td><span style="color: ${grade.grade === 'A' || grade.grade === 'A+' ? 'var(--success-color)' : grade.grade === 'B' ? 'var(--warning-color)' : 'inherit'}; font-weight: bold;">${grade.grade}</span></td>
            </tr>
        `).join('');
    }
    
    // Populate timetable table
    const timetableTableBody = document.querySelector('#timetableTable tbody');
    if (timetableTableBody) {
        timetableTableBody.innerHTML = sampleTimetable.map(period => `
            <tr>
                <td><strong>${period.time}</strong></td>
                <td>${period.monday}</td>
                <td>${period.tuesday}</td>
                <td>${period.wednesday}</td>
                <td>${period.thursday}</td>
                <td>${period.friday}</td>
            </tr>
        `).join('');
    }
    
    // Populate attendance table
    const attendanceTableBody = document.querySelector('#attendanceTable tbody');
    if (attendanceTableBody) {
        attendanceTableBody.innerHTML = sampleAttendance.map(record => `
            <tr>
                <td>${record.date}</td>
                <td><span style="color: ${record.status === 'Present' ? 'var(--success-color)' : 'var(--error-color)'}; font-weight: bold;">${record.status}</span></td>
                <td>${record.period1}</td>
                <td>${record.period2}</td>
                <td>${record.period3}</td>
                <td>${record.period4}</td>
            </tr>
        `).join('');
    }
    
    // Populate assignments table
    const assignmentsTableBody = document.querySelector('#assignmentsTable tbody');
    if (assignmentsTableBody) {
        assignmentsTableBody.innerHTML = sampleAssignments.map(assignment => `
            <tr>
                <td>${assignment.subject}</td>
                <td>${assignment.assignment}</td>
                <td>${assignment.dueDate}</td>
                <td><span class="status-badge ${assignment.status.toLowerCase()}">${assignment.status}</span></td>
                <td>${assignment.grade}</td>
                <td>
                    ${assignment.status === 'Pending' ? 
                        `<button class="btn btn-primary btn-sm">Submit</button>` : 
                        `<button class="btn btn-primary btn-sm" disabled>Submitted</button>`}
                </td>
            </tr>
        `).join('');
    }
}

// Load dashboard data based on role
function loadDashboardData() {
    if (currentRole === 'student') {
        // Update student profile information
        document.getElementById('studentRollNumber').textContent = currentUser.rollNumber || 'ST001';
        document.getElementById('studentClass').textContent = currentUser.class || 'Grade 10';
        document.getElementById('studentName').textContent = currentUser.name;
        document.getElementById('studentDob').textContent = formatDate(currentUser.dob) || '15/05/2008';
        document.getElementById('studentEmail').textContent = currentUser.email;
        document.getElementById('studentFather').textContent = currentUser.fatherName || 'Robert Johnson';
        document.getElementById('studentMother').textContent = currentUser.motherName || 'Mary Johnson';
        document.getElementById('studentPhone').textContent = currentUser.phone || '+1234567890';
    }
}

// Load data for a specific section
function loadSectionData(sectionId) {
    // In a real app, you would make API calls here based on the section
    console.log(`Loading data for section: ${sectionId}`);
}

// Update student profile
function updateStudentProfile() {
    // In a real app, you would make an API call to update the profile
    const updatedData = {
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        address: document.getElementById('editAddress').value
    };
    
    // For demo purposes, we'll just update the UI
    currentUser = { ...currentUser, ...updatedData };
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update the displayed information
    document.getElementById('studentName').textContent = updatedData.name;
    document.getElementById('studentEmail').textContent = updatedData.email;
    document.getElementById('studentPhone').textContent = updatedData.phone;
    
    closeModal('editStudentModal');
    showNotification('Profile updated successfully', 'success');
}

// Open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Pre-fill form fields if it's the edit modal
        if (modalId === 'editStudentModal' && currentUser) {
            document.getElementById('editName').value = currentUser.name || '';
            document.getElementById('editEmail').value = currentUser.email || '';
            document.getElementById('editPhone').value = currentUser.phone || '';
            document.getElementById('editAddress').value = currentUser.address || '';
        }
        
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notificationContainer.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, 300);
    }, 3000);
}

// Helper function to format date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
}

// Expose functions to global scope for HTML onclick handlers
window.login = login;
window.logout = logout;
window.openModal = openModal;
window.closeModal = closeModal;