using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Repositories;
using DAL.Repositories.Interfaces;

namespace DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly ApplicationDbContext _context;

//        ICustomerRepository _customers;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }



        // public ICustomerRepository Customers
        // {
        //     get
        //     {
        //         if (_customers == null)
        //             _customers = new CustomerRepository(_context);

        //         return _customers;
        //     }
        // }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }
    }
}
