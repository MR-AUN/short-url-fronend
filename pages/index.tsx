import Layout from "@/components/Layout"
import { withUser } from "@/src/hooks/auth/isAuth";
import { useShorter } from "@/src/hooks/shorter/mutations";
import { useGetAllShortByUser } from "@/src/hooks/shorter/queries";
import { log } from "console";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Home() {

  const router = useRouter()

  const { mutateAsync: handleShorter, isLoading, isSuccess } = useShorter()

  const [url, setUrl] = useState<string>('')
  const [result, setResult] = useState<ShorterResponse | undefined>()

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setUrl(value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await handleShorter({ long_url: url })
    setResult(result)
  }

  useEffect(() => {
    if (isSuccess) {
      setUrl('')
    }
  }, [isSuccess])

  const dataQuery = useGetAllShortByUser()


  return (
    <Layout>
      <Head>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />

      </Head>
      <div className="mt-4  p-5 card bg-base-100 shadow-xl">
        <div className="card-body ">
          <div className='mb-4'>
            <h1 className='text-center'>Short URL</h1>
          </div>
          <div className="text-center">
            <p className='text-clip'>Enter your long URL here</p>

            <form onSubmit={handleSubmit}>
              <div className="mt-3">
                <input disabled={isLoading} onChange={handleUrlChange} value={url} className="input input-bordered join-item" placeholder="Long Link URL" />
                <button disabled={isLoading} type="submit" className="btn join-item text-sm">Create URL</button>
              </div>
            </form>

          </div>

          {/* Result Shorter */}
          {result && (
            <>
              <div className="mt-4  alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className='text-sm'>Short url: <a href={`http://localhost:3000/${result.shorter_url}`} target="_blank" rel="noopener noreferrer">{`http://localhost:3000/${result.shorter_url}`}</a></span>
              </div>



              <div className='flex justify-center'>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${`http://localhost:3000/${result.shorter_url}`}`} className="max-w-sm rounded-lg shadow-2xl" />
              </div>
            </>
          )}


        </div>
      </div>


      {(dataQuery.data?.length ?? 0) > 0 && (
        <div className="mb-10 overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>QR</th>
                <th>Short URL</th>
                <th>Full URL</th>
                <th>View</th>
                <th>Create At</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}


              {dataQuery.data?.map((ele) => {
                const day_of_month = parseInt(ele.createdAt.substring(8, 10))
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = ((currentDate.getMonth() + 1).toString().padStart(2, '0'));
                const month_ = ((currentDate.getMonth() + 2).toString().padStart(2, '0'))
                const day = currentDate.getDate().toString().padStart(2, '0');

                const start_date = `${year}-${month}-${day}`
                return (
                  <tr key={ele.short_id}>
                    <td>
                      {/* The button to open modal */}
                      <label htmlFor="my_modal_7" className="cursor-pointer">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=http://localhost:3000/${ele.shorter_url}`} className="max-w-sm rounded-lg shadow-2xl" />
                      </label>

                      {/* Put this part before </body> tag */}
                      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                      <div className="modal">
                        <div className="modal-box flex justify-center">
                          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x300&data=http://localhost:3000/${ele.shorter_url}`} className="max-w-sm rounded-lg shadow-2xl" />
                        </div>
                        <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                      </div>
                    </td>
                    <td><a className="link link-success" href={`http://localhost:3000/${ele.shorter_url}`} target="_blank" rel="noopener noreferrer">{`http://localhost:3000/${ele.shorter_url}`}</a></td>
                    <td><a className="link link-info" href={ele.long_url} target="_blank" rel="noopener noreferrer">{ele.long_url}</a></td>
                    <td>{ele.view_count > 0 && ele.view_count < 10 ? `0${ele.view_count}` : `${ele.view_count}`}</td>
                    <td>{start_date}</td>
                  </tr>

                )
              }
              )
              }

            </tbody>
          </table>
          <img src="" ></img>
        </div>
      )}
    </Layout>
  )
}

export const getServerSideProps = withUser();