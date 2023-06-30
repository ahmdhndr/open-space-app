import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { asyncPopulateUsersAndTalks } from '../states/shared/action';
import { asyncAddTalk, asyncToggleLikeTalk } from '../states/talks/action';

import TalkInput from '../components/TalkInput';
import TalksList from '../components/TalksList';

function HomePage() {
  const talks = useSelector((state) => state.talks);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);
  // const { talks = [], users = [], authUser } = useSelector((states) => states);

  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  useEffect(() => {
    // @TODO: dispatch async action to populate talks and users data
    dispatch(asyncPopulateUsersAndTalks());
  }, [dispatch]);

  const onAddTalk = (text) => {
    // @TODO: dispatch async action to add talk
    dispatch(asyncAddTalk({ text }));
  };

  const onLike = (id) => {
    // @TODO: dispatch async action to toggle like talk
    dispatch(asyncToggleLikeTalk(id));
  };

  const talkList = talks.map((talk) => ({
    ...talk,
    user: users.find((user) => user.id === talk.user),
    authUser: authUser.id,
  }));

  return (
    <section className="home-page">
      <TalkInput addTalk={onAddTalk} />
      <TalksList talks={talkList} like={onLike} />
    </section>
  );
}

export default HomePage;
