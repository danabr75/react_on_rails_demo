// import React from 'react';
// import ReactDOM from 'react-dom';
// import PropTypes from "prop-types";

// // const API_PATH = "/api/v1/blogs"
// const API_PATH = "http://localhost3000/api/v1/blogs"

// function getAPIData() {
//   return axios.get(API_URL).then((response) => response.data)
// }




// import Pagination from 'react-rails-pagination';

// function Blogs(props) {
//   return <div>
//     <h3>Blogs</h3>
//     {props.blogs.map((blog) => {
//       return <div key={blog.id}>
//         <p>{book.title}</p>
//         <p>{book.body}</p>
//       </div>
//     })}
//   </div>
// }

// function BlogsPage = (props) => {
//   const [page, setPage] = useState(0);
//   const [totalPage, setTotalPages] = useState(0);
//   // This is a default value for totalPages, update it before you render your component. For Rails you can use `Model.query.page(params[:page]).per(10).total_pages` to get this value.

//   const fetchTableData = () => {
//     // You can replace the below mentioned API Call with a fetch or axios or whatever else you use in your project
//     Rails.ajax({
//       type: 'GET',
//       url: `/api/v1/blogs?page=${currentPage}`, // Replace with the URL you want to fetch data from
//       success(response) {
//         // ...
//         // //Update Table Data on success
//       },
//     });
//   };

//   handleChangePage(currentPage) {  // Required as a prop to update data in your table.
//     setPage(parseInt(currentPage)); // Update Current Page
//     fetchTableData(); // Fetch Data for the new page
//   };

//   return (
//     <>
//       <h3>Blogs</h3>
//       <table>
//         <thead>
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">Name</th>
//             <th scope="col">Code</th>
//           </tr>
//         </thead>
//         <tbody>{invitationsList}</tbody>
//       </table>

//       <Pagination page={page} pages={totalPages} handleChangePage={handleChangePage} />
//       {/* Component render with required props */}
//     </>
//   );
// };







// class GameBlogs extends React.Component {
//   render() {
//     return (
//       <React.Fragment>
//         The name of this component is: GameBlogs
//       </React.Fragment>
//     );
//   }
// }

// export default GameBlogs;


