using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Todo.Models
{
    public partial class TodoDBContext : DbContext
    {
        public TodoDBContext()
        {
        }

        public TodoDBContext(DbContextOptions<TodoDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TodoItem> TodoItems { get; set; }
        public virtual DbSet<TodoCategory> Categories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=master;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.0-rtm-35687");

            modelBuilder.Entity<TodoItem>(entity =>
            {
                entity.ToTable("todoItem");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasColumnName("text")
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.Category)
                    .IsRequired()
                    .HasColumnName("category")
                    .IsUnicode(false);

            });

            modelBuilder.Entity<TodoCategory>(entity =>
            {
                entity.ToTable("todoCategory");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasColumnName("text")
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });
        }
    }
}
