using Microsoft.AspNetCore.Mvc;
using PopUpModalWindow.Models;
using System.Collections.Generic;

namespace PopUpModalWindow.Controllers
{
    public class StudentController : Controller
    {
        private List<Student> students;
        public StudentController()
        {
            students = new List<Student>()
            {
                new Student(){FullName="AAA", Email="aa@gmail.com"},
                new Student(){FullName="BBB", Email="bb@gmail.com"},
                new Student(){FullName="CCC", Email="cc@gmail.com"},
                new Student(){FullName="DDD", Email="dd@gmail.com"},
            };
        }
        [HttpGet]
        public IActionResult Index()
        {
            return View(students);
        }
        [HttpGet]
        public IActionResult Create()
        {
            return PartialView();
        }
        [HttpPost]
        public IActionResult Create(Student model)
        {
            students.Add(model);
            return Json(
                new
                {
                    redirectTo = Url.Action("Index", "Student", new { Area = "" }),
                    message = "Record Created successfully!!!",
                    position = "mainContent"
                }
            );
        }
    }
}
