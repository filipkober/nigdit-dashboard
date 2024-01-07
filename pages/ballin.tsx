import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Reply from '../components/atoms/Reply';
import { StrapiReply } from '../models/Reply';
import StrapiResponse, { strapiResponseToData } from '../models/StrapiResponse';
import { incrementCounter } from '../store/userSlice';
import ReplyService from '../util/requests/ReplyService';
import PostMenu from '../components/molecules/PostMenu';
import PostText from '../components/molecules/PostText';

// type formValues = {
//   content: string;
//   votes: number;
// };

const Ballin: NextPage = () => {
  return (
    <>
      {/* <div className="flex flex-row">
        hello
        <PostMenu />
      </div>
      <div className="relative z-10">
        <PostText
          title={'title'}
          description={'asdf'}
          author={''}
          source={{
            image: '',
            name: '',
          }}
          votes={0}
          date={new Date()}
          id={0}
        />
        <PostText
          title={'title'}
          description={'asdf'}
          author={''}
          source={{
            image: '',
            name: '',
          }}
          votes={0}
          date={new Date()}
          id={0}
        />
        <PostText
          title={'title'}
          description={'asdf'}
          author={''}
          source={{
            image: '',
            name: '',
          }}
          votes={0}
          date={new Date()}
          id={0}
        />
        <PostText
          title={'title'}
          description={'asdf'}
          author={''}
          source={{
            image: '',
            name: '',
          }}
          votes={0}
          date={new Date()}
          id={0}
        />
        <PostText
          title={'title'}
          description={'asdf'}
          author={''}
          source={{
            image: '',
            name: '',
          }}
          votes={0}
          date={new Date()}
          id={0}
        />
        <PostText
          title={'title'}
          description={'asdf'}
          author={''}
          source={{
            image: '',
            name: '',
          }}
          votes={0}
          date={new Date()}
          id={0}
        />
        <PostText
          title={'title'}
          description={'asdf'}
          author={''}
          source={{
            image: '',
            name: '',
          }}
          votes={0}
          date={new Date()}
          id={0}
        />
        <PostText
          title={'title'}
          description={'asdf'}
          author={''}
          source={{
            image: '',
            name: '',
          }}
          votes={0}
          date={new Date()}
          id={0}
        />
        <PostText
          title={'title'}
          description={'asdf'}
          author={''}
          source={{
            image: '',
            name: '',
          }}
          votes={0}
          date={new Date()}
          id={0}
        />
      </div>
      <div className="h-[40vh] bg-red-200 w-[20vw] overflow-hidden">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta porro
        cum in ab doloribus officiis velit itaque voluptatibus et nihil nesciunt
        maxime, labore fuga suscipit, at veniam cumque minima error est aperiam
        impedit? Suscipit laborum fuga exercitationem non repudiandae rerum
        corporis nihil at inventore quam? Culpa eligendi quod quo. Sunt nihil
        fugit ea inventore facere quod minus nemo repellendus sint dicta
        nesciunt, corrupti repudiandae dolorum, possimus consectetur asperiores
        explicabo blanditiis exercitationem? Amet quae eligendi quo rerum
        placeat, molestias aperiam quasi commodi earum veniam iusto, dolorem ex
        perferendis. Hic iusto velit tempore aut eos quae beatae, modi sed quia
        porro explicabo expedita nihil numquam blanditiis fugiat culpa
        reprehenderit ullam veniam quis maiores autem a commodi saepe! Sint
        laudantium molestias facilis iste in, tempora aperiam, ipsa error
        ratione labore enim sed exercitationem adipisci dignissimos mollitia
        similique eos cupiditate ab dolor voluptatem! Ex quidem facere eum
        nesciunt tempore voluptatibus nemo excepturi debitis assumenda omnis,
        incidunt tempora numquam temporibus iure odit aperiam? Ea deleniti
        laborum hic asperiores? In facere est ipsum et repellat doloremque nobis
        ullam fugit porro reiciendis cum odit voluptas excepturi exercitationem,
        saepe autem quo vitae consequatur mollitia sunt beatae provident libero
        similique? Repellendus optio cumque deserunt labore nulla ea neque
        accusantium quasi minus, placeat ratione distinctio recusandae non
        quisquam nemo dolor nostrum assumenda reiciendis hic doloribus! Esse
        nostrum enim magnam eveniet, perferendis quam officiis optio quidem
        alias facilis repellat provident dolores voluptatem fugit ea quo beatae
        incidunt, non, ad officia mollitia similique soluta. Quis nisi enim,
        inventore sed error consequuntur mollitia commodi, maiores nesciunt vel,
        voluptatum ipsum fugit modi reiciendis at porro similique delectus earum
        nihil veritatis! Odit aliquam velit cum sunt nulla laboriosam ratione
        modi quod nam. Corrupti necessitatibus quidem ex at obcaecati, dolores
        reiciendis vel non consequatur amet incidunt deleniti, praesentium
        cupiditate temporibus eius repudiandae dolore? Dolorum, eius saepe?
      </div> */}
      what was above was breaking the build
    </>
  );
};

//   const dispatch = useDispatch();

//   const onClick = () => {
//     dispatch(incrementCounter());
//   };

//   const replyService = new ReplyService();

//   const [replies, setReplies] = useState<StrapiReply[]>([]);

//   const initialValues: formValues = {
//     content: '',
//     votes: 0,
//   };

//   useEffect(() => {
//     // fetch('http://localhost:1338/api/replies').then((res) => {
//     //   res.json().then((data: StrapiResponse<StrapiReply[]>) => {
//     //     setReplies(strapiResponseToData(data));
//     //   });
//     // });
//     replyService.getAll().then((data) => {
//       setReplies(data);
//     });
//   }, []);

//   const deleteReply = (id: number) => {
//     // fetch(`http://localhost:1338/api/replies/${id}`, {
//     //   method: 'DELETE',
//     // }).then((res) => {
//     //   res.json().then((data: StrapiResponse<StrapiReply>) => {
//     //     const newReplies = replies.filter((reply) => reply.id !== data.data.id);
//     //     setReplies(newReplies);
//     //   })
//     // });
//     replyService.delete(id).then((data) => {
//       const newReplies = replies.filter((reply) => reply.id !== data.id);
//       setReplies(newReplies);
//     });
//   };

//   const updateReply = async (id: number, currentVotes: number) => {
//     const newVotes = prompt("Podaj nową ilość głosów", String(currentVotes));
//     if(newVotes === null) return;
//     if(Number.isNaN(Number(newVotes))) {
//       alert("Podaj liczbę");
//       return;
//     }
// const res = await fetch(`http://localhost:1338/api/replies/${id}`, {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     data: {
//       votes: Number(newVotes),
//     },
//   }),
// });
// const data: StrapiResponse<StrapiReply> = await res.json();
// const newReplies = replies.map((reply) => {
//   if(reply.id === data.data.id) {
//     return data.data;
//   }
//   return reply;
// });
// setReplies(newReplies);

//   const data = await replyService.update(id, {votes: Number(newVotes)});
//   const newReplies = replies.map((reply) => {
//     if(reply.id === data.id) {
//       return data;
//     }
//     return reply;
//   }
//   );
//   setReplies(newReplies);
//   };

//   console.log(replies);

//   return (
//     <div>
//       <button onClick={onClick}>Klik klik</button>
//       <div>
//         {replies.map((reply) => (
//           <div>
//             <Reply
//             key={reply.id}
//             id={reply.id}
//             votes={reply.attributes.votes}
//             pfp={''}
//             nick={''}
//             content={reply.attributes.content}
//             responseTo={0}
//           />
//           <button onClick={() => {deleteReply(reply.id)}} className={"bg-red-600"}>Usuń reply id {reply.id}</button> <br />
//           <button onClick={() => {updateReply(reply.id, reply.attributes.votes)}} className={"bg-blue-600"}>Edytuj głosy reply o id: {reply.id}</button> <br />
//           </div>
//         ))}
//       </div>
//       <br />
//       <div>
//         <FORMIK IS ILLEGAL NOW>
//           initialValues={initialValues}
//           onSubmit={async (values) => {
//             let votes = Math.random() * 100;
//             votes = Math.floor(votes);

//             const body = JSON.stringify({
//               data: {
//                 content: values.content,
//                 votes: votes,
//               },
//             });

//             console.log(body);

//             const res = await fetch('http://localhost:1338/api/replies', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: body,
//             });
//             const data: StrapiResponse<StrapiReply> = await res.json();

//             console.log("data", data);

//             setReplies([...replies, data.data]);
//           }}
//           validationSchema={null}
//         >
//           {({ values, errors, touched, handleSubmit, handleChange, submitForm }) => {
//             return (
//               <form onSubmit={handleSubmit}>
//                 <input
//                   type="text"
//                   name="content"
//                   value={values.content}
//                   onChange={handleChange}
//                   className={'text-black'}
//                 />
//                 <button type='submit'>Submit</button>
//               </form>
//             );
//           }}
//         </FORMIK IS ILLEGAL NOW>
//       </div>
//     </div>
//   );
// };

export default Ballin;
