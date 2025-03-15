const sheetDBUrl = "https://sheetdb.io/api/v1/lt0ietiht3gpu"; // Replace with your SheetDB API URL
const apiKey = "https://sheetdb.io/api/v1/lt0ietiht3gpu"; // Replace with your SheetDB API key

// Function to collect attendance data and submit it
function submitAttendance() {
  const students = document.querySelectorAll('.student');
  const attendanceData = [];

  students.forEach((student, index) => {
    const name = student.querySelector('span').innerText.split(' (')[0]; // Extract name
    const className = student.querySelector('span').innerText.match(/\((.*?)\)/)[1]; // Extract class
    const attendance = student.querySelector('input[type="radio"]:checked')?.value || "Absent"; // Default to "Absent" if not selected

    attendanceData.push({
      Name: name,
      Class: className,
      Attendance: attendance,
      Timestamp: new Date().toISOString()
    });
  });

  // Send data to SheetDB
  fetch(sheetDBUrl, {
    method: "POST",
    body: JSON.stringify({ data: attendanceData }),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(result => {
    alert("Attendance submitted successfully!");
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Failed to submit attendance.");
  });
}