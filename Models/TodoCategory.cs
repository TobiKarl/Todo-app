using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Todo.Models
{
    public class TodoCategory
    {
        public TodoCategory(string text)
        {
            Text = text;
        }

        public string Text { get; set; }
        public int Id { get; set; }
    }
}
