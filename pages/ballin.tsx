import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Reply from '../components/atoms/Reply';
import { StrapiReply } from '../models/Reply';
import StrapiResponse, { strapiResponseToData } from '../models/StrapiResponse';
import { incrementCounter } from '../store/userSlice';
import ReplyService from '../util/requests/ReplyService';

type formValues = {
  content: string;
  votes: number;
};

const Ballin: NextPage = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(incrementCounter());
  };

  const replyService = new ReplyService();

  const [replies, setReplies] = useState<StrapiReply[]>([]);

  const initialValues: formValues = {
    content: '',
    votes: 0,
  };

  useEffect(() => {
    // fetch('http://localhost:1338/api/replies').then((res) => {
    //   res.json().then((data: StrapiResponse<StrapiReply[]>) => {
    //     setReplies(strapiResponseToData(data));
    //   });
    // });
    replyService.getAll().then((data) => {
      setReplies(data);
    });
  }, []);

  const deleteReply = (id: number) => {
    // fetch(`http://localhost:1338/api/replies/${id}`, {
    //   method: 'DELETE',
    // }).then((res) => {
    //   res.json().then((data: StrapiResponse<StrapiReply>) => {
    //     const newReplies = replies.filter((reply) => reply.id !== data.data.id);
    //     setReplies(newReplies);
    //   })
    // });
    replyService.delete(id).then((data) => {
      const newReplies = replies.filter((reply) => reply.id !== data.id);
      setReplies(newReplies);
    });
  };

  const updateReply = async (id: number, currentVotes: number) => {
    const newVotes = prompt("Podaj nową ilość głosów", String(currentVotes));
    if(newVotes === null) return;
    if(Number.isNaN(Number(newVotes))) {
      alert("Podaj liczbę");
      return;
    }
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

  const data = await replyService.update(id, {votes: Number(newVotes)});
  const newReplies = replies.map((reply) => {
    if(reply.id === data.id) {
      return data;
    }
    return reply;
  }
  );
  setReplies(newReplies);
  };

  console.log(replies);

  return (
    <div>
      <button onClick={onClick}>Klik klik</button>
      <div>
        {replies.map((reply) => (
          <div>
            <Reply
            key={reply.id}
            id={reply.id}
            votes={reply.attributes.votes}
            pfp={''}
            nick={''}
            content={reply.attributes.content}
            responseTo={0}
          />
          <button onClick={() => {deleteReply(reply.id)}} className={"bg-red-600"}>Usuń reply id {reply.id}</button> <br />
          <button onClick={() => {updateReply(reply.id, reply.attributes.votes)}} className={"bg-blue-600"}>Edytuj głosy reply o id: {reply.id}</button> <br />
          </div>
        ))}
      </div>
      <br />
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            let votes = Math.random() * 100;
            votes = Math.floor(votes);

            const body = JSON.stringify({
              data: {
                content: values.content,
                votes: votes,
              },
            });

            console.log(body);

            const res = await fetch('http://localhost:1338/api/replies', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: body,
            });
            const data: StrapiResponse<StrapiReply> = await res.json();

            console.log("data", data);
            
            setReplies([...replies, data.data]);
          }}
          validationSchema={null}
        >
          {({ values, errors, touched, handleSubmit, handleChange, submitForm }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                  className={'text-black'}
                />
                <button type='submit'>Submit</button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Ballin;
