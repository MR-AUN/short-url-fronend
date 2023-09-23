import { getShortSsr } from "@/src/services/shorter.service";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
export const withoutShort = () => {
    const getServerSideProps: GetServerSideProps = async (context) => {
        const queryClient = new QueryClient();
        const { query } = context;
        const url = query.short_url as string;
        console.log("url", url);
        
        await queryClient.prefetchQuery(["shorter"], () =>
            getShortSsr(url)
        );
        const short: ShorterResponse | undefined = queryClient.getQueryData(["shorter"]);
        
        if (short) {
            return {
                redirect: {
                    destination: short.long_url,
                    permanent: false,
                },
            };
        }else if(!short) {
            return {
                redirect: {
                    destination: `/`,
                    permanent: false,
                },
            };
        }
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
            },
        };
    };
    return getServerSideProps
}