document.addEventListener("DOMContentLoaded", function () {
  const app = document.getElementById("app");
  const studentListContainer = document.getElementById("studentList");
  const studentDetailsContainer = document.getElementById("studentDetails");
  const addStudentBtn = document.getElementById("addStudentBtn");
  const teacherListContainer = document.getElementById("teacherList");
  const teacherDetailsContainer = document.getElementById("teacherDetails");
  const addTeacherBtn = document.getElementById("addTeacherBtn");
  const marksDetailsContainer = document.getElementById("marksDetails");
  const selectStudentBtn = document.getElementById("selectStudentBtn");

  let students = [
    { id: 1, name: "John Doe", class: "10th", marks: 95 },
    { id: 2, name: "Jane Doe", class: "9th", marks: 85 },
    { id: 3, name: "Alice Johnson", class: "11th", marks: 90 },
  ];

  let teachers = [
    { id: 1, name: "John Smith", subject: "Math" },
    { id: 2, name: "Jane Johnson", subject: "English" },
  ];

  let selectedStudents = [];

 // Function to display students
 function displayStudents() {
  studentListContainer.innerHTML = "";
  students.slice(0, 10).forEach(student => {
    const studentDiv = document.createElement("div");
    studentDiv.classList.add("student");
    studentDiv.innerHTML = `${student.name} - Class: ${student.class}
                              <input type="checkbox" class="student-checkbox" data-student-id="${student.id}">
                              <button class="view-btn" data-student-id="${student.id}">View</button>
                              <button class="edit-btn" data-student-id="${student.id}">Edit</button>
                              <button class="delete-btn" data-student-id="${student.id}">Delete</button>`;
    studentListContainer.appendChild(studentDiv);
  });
}

// Function to display teachers
function displayTeachers() {
  teacherListContainer.innerHTML = "";
  teachers.slice(0, 10).forEach(teacher => {
    const teacherDiv = document.createElement("div");
    teacherDiv.classList.add("teacher");
    teacherDiv.innerHTML = `${teacher.name} - Subject: ${teacher.subject}
                            <button class="view-btn" data-teacher-id="${teacher.id}">View</button>
                            <button class="edit-btn" data-teacher-id="${teacher.id}">Edit</button>
                            <button class="delete-btn" data-teacher-id="${teacher.id}">Delete</button>`;
    teacherListContainer.appendChild(teacherDiv);
  });
}

// Function to display marks screen
function displayMarksScreen() {
  marksDetailsContainer.innerHTML = "";
  if (selectedStudents.length > 0) {
    selectedStudents.forEach(student => {
      const marksDiv = document.createElement("div");
      marksDiv.classList.add("marks-details");
      marksDiv.innerHTML = `<p><strong>Student ID:</strong> ${student.id}</p>
                            <p><strong>Name:</strong> ${student.name}</p>
                            <p><strong>Class:</strong> ${student.class}</p>
                            <p><strong>Teacher:</strong> [teacher name]</p>
                            <p><strong>Subject:</strong> [subject]</p>
                            <p><strong>Marks:</strong> [marks]</p>`;
      marksDetailsContainer.appendChild(marksDiv);
    });
  } else {
    marksDetailsContainer.innerHTML = "<p>No students selected</p>";
  }
}

  addStudentBtn.addEventListener("click", function () {
    studentDetailsContainer.innerHTML = `<h2>Add Student</h2>
                                            <form id="addStudentForm">
                                              <label for="addStudentName">Name:</label>
                                              <input type="text" id="addStudentName" name="addStudentName" required>
                                              <label for="addStudentClass">Class:</label>
                                              <input type="text" id="addStudentClass" name="addStudentClass" required>
                                              <label for="addStudentMarks">Marks:</label>
                                              <input type="number" id="addStudentMarks" name="addStudentMarks" required>
                                              <button type="button" id="submitAddStudentBtn">Add Student</button>
                                            </form>`;

    const submitAddStudentBtn = document.getElementById("submitAddStudentBtn");
    submitAddStudentBtn.addEventListener("click", function () {
      const newName = document.getElementById("addStudentName").value;
      const newClass = document.getElementById("addStudentClass").value;
      const newMarks = parseInt(document.getElementById("addStudentMarks").value);

      const newStudent = {
        id: students.length + 1,
        name: newName,
        class: newClass,
        marks: newMarks,
      };
      students.push(newStudent);

      displayStudents();

      studentDetailsContainer.innerHTML = `<h2>Student Details</h2>
                                              <p>No student selected</p>`;
    });
  });

  addTeacherBtn.addEventListener("click", function () {
    teacherDetailsContainer.innerHTML = `<h2>Add Teacher</h2>
                                          <form id="addTeacherForm">
                                            <label for="addTeacherName">Name:</label>
                                            <input type="text" id="addTeacherName" name="addTeacherName" required>
                                            <label for="addTeacherSubject">Subject:</label>
                                            <input type="text" id="addTeacherSubject" name="addTeacherSubject" required>
                                            <button type="button" id="submitAddTeacherBtn">Add Teacher</button>
                                          </form>`;

    const submitAddTeacherBtn = document.getElementById("submitAddTeacherBtn");
    submitAddTeacherBtn.addEventListener("click", function () {
      const newName = document.getElementById("addTeacherName").value;
      const newSubject = document.getElementById("addTeacherSubject").value;

      const newTeacher = {
        id: teachers.length + 1,
        name: newName,
        subject: newSubject,
      };
      teachers.push(newTeacher);

      displayTeachers();

      teacherDetailsContainer.innerHTML = `<h2>Teacher Details</h2>
                                            <p>No teacher selected</p>`;
    });
  });

  selectStudentBtn.addEventListener("click", function () {
    const selectedStudentsList = document.getElementById("selectedStudentsList");
    selectedStudentsList.innerHTML = "";

    students.slice(0, 10).forEach(student => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `studentCheckbox_${student.id}`;
      checkbox.value = student.id;
      checkbox.addEventListener("change", function (event) {
        const studentId = parseInt(event.target.value);

        if (event.target.checked) {
          selectedStudents.push(students.find(s => s.id === studentId));
        } else {
          selectedStudents = selectedStudents.filter(s => s.id !== studentId);
        }
      });

      const label = document.createElement("label");
      label.htmlFor = `studentCheckbox_${student.id}`;
      label.textContent = `${student.name} - Class: ${student.class}`;

      const listItem = document.createElement("li");
      listItem.appendChild(checkbox);
      listItem.appendChild(label);

      selectedStudentsList.appendChild(listItem);
    });
  });

  studentListContainer.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("view-btn")) {
      const studentId = parseInt(target.dataset.studentId);
      viewStudent(studentId);
    } else if (target.classList.contains("edit-btn")) {
      const studentId = parseInt(target.dataset.studentId);
      editStudentForm(studentId);
    } else if (target.classList.contains("delete-btn")) {
      const studentId = parseInt(target.dataset.studentId);
      deleteStudent(studentId);
    }
  });

  teacherListContainer.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("view-btn")) {
      const teacherId = parseInt(target.dataset.teacherId);
      viewTeacher(teacherId);
    } else if (target.classList.contains("edit-btn")) {
      const teacherId = parseInt(target.dataset.teacherId);
      editTeacherForm(teacherId);
    } else if (target.classList.contains("delete-btn")) {
      const teacherId = parseInt(target.dataset.teacherId);
      deleteTeacher(teacherId);
    }
  });

  selectStudentBtn.addEventListener("click", function () {
    const selectedStudentIds = []; // Array to store selected student IDs
    const checkboxes = document.querySelectorAll(".student-checkbox");
  
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const studentId = parseInt(checkbox.dataset.studentId);
        selectedStudentIds.push(studentId);
      }
    });
  
    // Use the selected student IDs to filter the students array
    selectedStudents = students.filter(student => selectedStudentIds.includes(student.id));
    displayMarksScreen();
  });

  function viewStudent(studentId) {
    const selectedStudent = students.find(student => student.id === studentId);
    studentDetailsContainer.innerHTML = `<h2>Student Details</h2>
                                            <p><strong>Name:</strong> ${selectedStudent.name}</p>
                                            <p><strong>Class:</strong> ${selectedStudent.class}</p>
                                            <p><strong>Marks:</strong> ${selectedStudent.marks}</p>`;
  }

  function editStudentForm(studentId) {
    const selectedStudent = students.find(student => student.id === studentId);

    studentDetailsContainer.innerHTML = `<h2>Edit Student</h2>
                                            <form id="editStudentForm">
                                              <label for="editStudentName">Name:</label>
                                              <input type="text" id="editStudentName" name="editStudentName" value="${selectedStudent.name}" required>
                                              <label for="editStudentClass">Class:</label>
                                              <input type="text" id="editStudentClass" name="editStudentClass" value="${selectedStudent.class}" required>
                                              <label for="editStudentMarks">Marks:</label>
                                              <input type="number" id="editStudentMarks" name="editStudentMarks" value="${selectedStudent.marks}" required>
                                              <button type="button" id="submitEditStudentBtn">Save Changes</button>
                                            </form>
                                            <button class="cancel-btn">Cancel</button>`;

    const submitEditStudentBtn = document.getElementById("submitEditStudentBtn");
    submitEditStudentBtn.addEventListener("click", function () {
      const editedName = document.getElementById("editStudentName").value;
      const editedClass = document.getElementById("editStudentClass").value;
      const editedMarks = parseInt(document.getElementById("editStudentMarks").value);

      selectedStudent.name = editedName;
      selectedStudent.class = editedClass;
      selectedStudent.marks = editedMarks;

      displayStudents();

      studentDetailsContainer.innerHTML = `<h2>Student Details</h2>
                                              <p>No student selected</p>`;
    });

    const cancelBtn = document.querySelector(".cancel-btn");
    cancelBtn.addEventListener("click", function () {
      viewStudent(selectedStudent.id);
    });
  }

  function deleteStudent(studentId) {
    const indexToDelete = students.findIndex(student => student.id === studentId);

    if (indexToDelete !== -1) {
      students.splice(indexToDelete, 1);

      displayStudents();

      studentDetailsContainer.innerHTML = `<h2>Student Details</h2>
                                              <p>No student selected</p>`;
    }
  }

  function viewTeacher(teacherId) {
    const selectedTeacher = teachers.find(teacher => teacher.id === teacherId);
    teacherDetailsContainer.innerHTML = `<h2>Teacher Details</h2>
                                          <p><strong>Name:</strong> ${selectedTeacher.name}</p>
                                          <p><strong>Subject:</strong> ${selectedTeacher.subject}</p>`;
  }

  function editTeacherForm(teacherId) {
    const selectedTeacher = teachers.find(teacher => teacher.id === teacherId);

    teacherDetailsContainer.innerHTML = `<h2>Edit Teacher</h2>
                                            <form id="editTeacherForm">
                                              <label for="editTeacherName">Name:</label>
                                              <input type="text" id="editTeacherName" name="editTeacherName" value="${selectedTeacher.name}" required>
                                              <label for="editTeacherSubject">Subject:</label>
                                              <input type="text" id="editTeacherSubject" name="editTeacherSubject" value="${selectedTeacher.subject}" required>
                                              <button type="button" id="submitEditTeacherBtn">Save Changes</button>
                                            </form>
                                            <button class="cancel-btn">Cancel</button>`;

    const submitEditTeacherBtn = document.getElementById("submitEditTeacherBtn");
    submitEditTeacherBtn.addEventListener("click", function () {
      const editedName = document.getElementById("editTeacherName").value;
      const editedSubject = document.getElementById("editTeacherSubject").value;

      selectedTeacher.name = editedName;
      selectedTeacher.subject = editedSubject;

      displayTeachers();

      teacherDetailsContainer.innerHTML = `<h2>Teacher Details</h2>
                                            <p>No teacher selected</p>`;
    });

    const cancelBtn = document.querySelector(".cancel-btn");
    cancelBtn.addEventListener("click", function () {
      viewTeacher(selectedTeacher.id);
    });
  }

  function deleteTeacher(teacherId) {
    const indexToDelete = teachers.findIndex(teacher => teacher.id === teacherId);

    if (indexToDelete !== -1) {
      teachers.splice(indexToDelete, 1);

      displayTeachers();

      teacherDetailsContainer.innerHTML = `<h2>Teacher Details</h2>
                                            <p>No teacher selected</p>`;
    }
  }

  displayStudents();
  displayTeachers();
  displayMarksScreen();
});
