module.exports = {
  user: {
    id: {type: 'increments', nullable: false, primary: true},
    username: {type: 'string', nullable: false, maxlength: 20},
    password: {type: 'string', nullable: false, maxlength: 20},
    name: {type: 'string', nullable: false, maxlength: 50},
    profilePic: {type: 'string', nullable: false, defaultTo: 'http://oregoncapitalprsa.org/wp-content/uploads/2011/04/default-profile4.jpg', maxlength:500 },
    email: {type: 'string', nullable: false, maxlength: 50},
    bio: {type: 'text', nullable: true},
    active: {type: 'boolean', nullable: false, defaultTo: true}
  },
  topic: {
    id: {type: 'increments', nullable: false, primary: true},
    topic: {type: 'string', nullable: false}
  },
  subtopic: {
    id: {type: 'increments', nullable: false, primary: true},
    topic_id: {type: 'integer', nullable: false, references: 'topic.id'},
    subtopic: {type: 'string', nullable: false}
  },
  quiz: {
    id: {type: 'increments', nullable: false, primary: true},
    subtopic_id: {type: 'integer', nullable: false, references: 'subtopic.id'},
    quiz: {type: 'string', nullable: false},
    details: {type: 'text', nullable: true},
    passing: {type: 'float', nullable: false, defaultTo: 75.00},
    public: {type: 'boolean', nullable: false, defaultTo: false},
    start: {type: 'dateTime', nullable: true},
    end: {type: 'dateTime', nullable: true},
    password: {type: 'string', nullable: true},
    className:{type: 'string', nullable: true},
    created_by: {type: 'integer', nullable: false, references: 'user.id'},
    active: {type: 'boolean', nullable: false, defaultTo: true}
  },
  question: {
    id: {type: 'increments', nullable: false, primary: true},
    quiz_id: {type: 'integer', nullable: false, references: 'quiz.id'},
    image: {type: 'string', nullable: true},
    question: {type: 'text', nullable: false}
  },
  answer_option: {
    id: {type: 'increments', nullable: false, primary: true},
    question_id: {type: 'integer', nullable: false, references: 'question.id'},
    answer: {type: 'text', nullable: false},
    correct: {type: 'boolean', nullable: false, defaultTo: false}
  },
  attempt: {
    id: {type: 'increments', nullable: false, primary: true},
    quiz_id: {type: 'integer', nullable: false, references: 'quiz.id'},
    user_id: {type: 'integer', nullable: false, references: 'user.id'},
    pass_count: {type: 'integer', nullable: false},
    fail_count: {type: 'integer', nullable: false},
    result: {type: 'float', nullable: false}
  },
  user_answer: {
    id: {type: 'increments', nullable: false, primary: true},
    attempt_id: {type: 'integer', nullable: false, references: 'attempt.id'},
    answer_option_id: {type: 'integer', nullable: false, references: 'answer_option.id'}
  },
  invitee: {
    id: {type: 'increments', nullable: false, primary: true},
    quiz_id: {type: 'integer', nullable: false, references: 'quiz.id'},
    user_id: {type: 'integer', nullable: false, references: 'user.id'}
  }
};
