using System;
using System.Collections.Generic;

namespace Todo.Models
{
    public partial class TodoItem
    {
        public TodoItem(string text, int category)
        {
            Text = text;
            Category = category;
        }

        public int Id { get; set; }
        public string Text { get; set; }
        public int Category { get; set; }
    }
}
