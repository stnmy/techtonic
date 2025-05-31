using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOS
{
    public class PaginationDataDto
    {

        public int totalCount { get; set; }
        public int start { get; set; }
        public int end { get; set; }
        public int pageSize { get; set; }
        public int currentPage { get; set; }
        public int totalPageNumber { get; set; }
    }
}