// import { getInfoSsr } from "@/src/services/auth.service";
// import { QueryClient, dehydrate } from "@tanstack/react-query";
// import { GetServerSideProps } from "next";

// export const withoutUser = () => {
//     const getServerSideProps: GetServerSideProps = async (context) => {
//         const queryClient = new QueryClient();
       
        
//         await queryClient.prefetchQuery(["me"], () =>
//             getInfoSsr()
//         );
//         const me = queryClient.getQueryData(["me"]);
        
//         if (me) {
//             return {
//                 redirect: {
//                     destination: "/",
//                     permanent: false,
//                 },
//             };
//         }
//         return {
//             props: {
//                 dehydratedState: dehydrate(queryClient),
//             },
//         };
//     };
//     return getServerSideProps
// }

// export const withUser = () => {
//     const getServerSideProps: GetServerSideProps = async (context) => {
//         const queryClient = new QueryClient();

//         await queryClient.prefetchQuery(["me"], () =>
//             getInfoSsr()
//         );
//         const me= queryClient.getQueryData(["me"]);
        
        
//         if (!me) {
//             return {
//                 redirect: {
//                     destination: "/signin",
//                     permanent: false,
//                 },
//             };
//         } 
//         return {
//             props: {
//                 dehydratedState: dehydrate(queryClient),
//             },
//         };
//     };
//     return getServerSideProps
// }

