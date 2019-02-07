using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update;
using Todo.Models;

namespace Todo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoDataController : Controller
    {

        private readonly TodoDBContext _context = new TodoDBContext();

        [HttpGet("[action]")]
        public DbSet<TodoCategory> TodoCategories()
        {
            return _context.Categories;
        }


        [HttpGet("[action]/{categoryId}")]
        public IQueryable<TodoItem> TodoCategoryItems(int categoryId)
        {
            return _context.TodoItems.Where(item => item.Category == categoryId);
            
        }

        [HttpPost("[action]")]
        public IQueryable AddItem([FromBody] TodoItem item)
        {
            if (item.Text != null || item.Category > 0)
            {

                _context.Add(new TodoItem(item.Text, item.Category));
                _context.SaveChanges();
            }

            return _context.TodoItems.Where(i => i.Category == item.Category);
        }

        [HttpPost("[action]")]
        public DbSet<TodoCategory> AddCategory([FromBody] TodoCategory category)
        {
            if (category.Id > 0 || category.Text != "")
            {
                _context.Add(new TodoCategory(category.Text));
                _context.SaveChanges();
            }

            return _context.Categories;
        }

        [HttpPost("[action]")]
        public IQueryable DeleteItem([FromBody] TodoItem item)
        {
            var toBeDeleted =  _context.TodoItems.FirstOrDefault(i => i.Id == item.Id);

            if (toBeDeleted != null)
            {
                _context.Remove(toBeDeleted);
                _context.SaveChanges();
            }

            return _context.TodoItems.Where(i => i.Category == item.Category);
        }

        [HttpPost("[action]")]
        public IQueryable DeleteCategory([FromBody] TodoCategory category)
        {
            var categoryToBeDeleted = _context.Categories.SingleOrDefault(e => e.Id == category.Id);

            if (categoryToBeDeleted != null)
            {
                var itemsToBeDeleted = _context.TodoItems.Where(e => e.Category == category.Id).ToArray();
                if (itemsToBeDeleted.Length > 0)
                {
                    _context.RemoveRange(itemsToBeDeleted);
                    _context.SaveChanges();
                }

                _context.Remove(categoryToBeDeleted);
                _context.SaveChanges();
            }

            return _context.Categories;
        }


    }
}