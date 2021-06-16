using Microsoft.AspNetCore.Mvc;
using PopUpModalWindow.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PopUpModalWindow.Controllers
{
    public class StudentController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View(new List<Student>());
        }

        [HttpGet]
        public IActionResult Create()
        {
            //return Json(
            //    new
            //    {
            //        redirectTo = Url.Action("PendingAuthorization", "RuleConfig", new { Area = "" }),
            //        message = "Record Updated successfully!!!",
            //        position = "subContainer"
            //    }
            //);
            return PartialView();
        }
        [HttpPost]
        public IActionResult Create(Student model)
        {
            return Json(model);
        }
    }
}
