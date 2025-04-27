import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Modal, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, FormGroup, Checkbox, Grid, List, ListItem, ListItemText } from '@mui/material';
import { getAnswerList, registerCount, getCountList, deleteCount } from '../api/voteApi';
import { handleApiError } from '../api/errorHandler';
import { UserContext } from "./userProvider";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none', 
  borderRadius: '16px', 
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  p: 4,
};

export default function VoteModal({question}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [answerList, setAnswerList] = useState([]);
  const [countList, setCountList] = useState([]);
  const [isVoted, setIsVoted] = useState(false);
  const [radioValue, setRadioValue] = useState("");
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [secondary, setSecondary] = useState(false);


  const handleEditSubmit = async (question, answerList) => {
    
    navigate('/vote/edit',{state: {question:question, answerList:answerList}});
  };

  const radioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleVoteSubmit = async () => {
    setError(null);

    const questionId = question.voteQuestionId;
    const userId = userData.userId;
    
    try {
      const response = await registerCount({voteQuestionId:questionId,voteAnswerId:radioValue,userId:userId});
      if (response.status === 200) {
          fetchCountList();
      } else {
          setError(`投票に失敗しました: ${response.data.message}`);
      }
    } catch (error) {
        setError(handleApiError(error));
    }
  };

  const handleVoteDelSubmit = async () => {
    setError(null);

    const questionId = question.voteQuestionId;
    const userId = userData.userId;
    const answer = countList.find((item) => item.userId === userData.userId);
    const answerId = answer.voteAnswerId;
    const countId = answer.voteCountId;
    
    try {
      const response = await deleteCount({voteCountId:countId,voteQuestionId:questionId,voteAnswerId:answerId,userId:userId});
      if (response.status === 200) {
          fetchCountList();
      } else {
          setError(`投票に失敗しました: ${response.data.message}`);
      }
    } catch (error) {
        setError(handleApiError(error));
    }
  };

  const fetchAnswerList = async () => {
    setError(null);

    const questionId = question.voteQuestionId;
    
    try {
      const response = await getAnswerList({voteQuestionId:questionId});
      if (response.status === 200) {
          setAnswerList(response.data);
      } else {
          setError(`回答の取得に失敗しました: ${response.data.message}`);
      }
    } catch (error) {
        setError(handleApiError(error));
    }
  };

  const fetchCountList = async () => {
    setError(null);

    const questionId = question.voteQuestionId;
    
    try {
      const response = await getCountList({voteQuestionId:questionId});
      if (response.status === 200) {
          setCountList(response.data);
          setIsVoted(response.data.some((item) => item.userId === userData.userId));
      } else {
          setError(`回答の取得に失敗しました: ${response.data.message}`);
      }
    } catch (error) {
        setError(handleApiError(error));
    }
  };


  useEffect(() => {
    if(open){
      setSecondary(false);
      fetchAnswerList();
      fetchCountList();
    }
  }, [open]);

  useEffect(() => {
    if (error !== null){
        console.log(error);
    }
  }, [error]);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>View</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Box display="flex" justifyContent="space-between" alignItems="center">
                          
            <Typography variant="h4" component="h2" gutterBottom>
              {question.title}
            </Typography>

            <Button variant="outlined" type="submit" size="large"  onClick={() => handleEditSubmit(question, answerList)}>
                編集
            </Button>
          </Box>

          {question.deleteAt === null && isVoted === false && 
            <FormControl component="fieldset">
              <FormLabel component="legend">回答を選択</FormLabel>
              <RadioGroup aria-label="answer" name="answer" value={radioValue} onChange={radioChange}>
                {answerList.map((answer) =>
                  <FormControlLabel key={answer.voteAnswerId} value={answer.voteAnswerId} control={<Radio />} label={answer.answer} />
                )}
              </RadioGroup>
              <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="outlined" type="submit" size="large" onClick={handleVoteSubmit}>
                  投票
                </Button>
              </Box>
            </FormControl>
          }
          {isVoted === true && 

            <Grid>
              <Typography variant="h6" >
                結果を表示
              </Typography>
              <List>
                {answerList.map((answer) => {
                  const matchingUsers = countList
                    .filter((item) => item.voteAnswerId === answer.voteAnswerId)
                    .map((item) => item.username);

                  
                  const voteCount = matchingUsers.length;
                  const voteUser = matchingUsers.join(`\n`)
                  return (
                    <ListItem key={answer.voteAnswerId} sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc' }}>
                      <ListItemText
                        primary={answer.answer}
                        secondary={secondary ? <Typography variant="body2" color="textSecondary" component="pre">{voteUser}</Typography> : null}
                      />
                      {/* 右端に票数を表示 */}
                      <Typography variant="body2" color="textSecondary">
                        {voteCount}票
                      </Typography>
                    </ListItem>
                  );
                })}
                <br />
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc' }}>
                  <ListItemText
                    primary='合計'
                  />
                  {/* 右端に票数を表示 */}
                  <Typography variant="body2" color="textSecondary">
                    {countList.length}票
                  </Typography>
                </ListItem>
              </List>
              <br />
            </Grid>
          }
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {isVoted === true &&
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={secondary}
                      onChange={(event) => setSecondary(event.target.checked)}
                    />
                  }
                  label="詳細を表示"
                />
              </FormGroup>
            }
            {question.deleteAt === null && isVoted === true &&

              <Button variant="outlined" type="submit" onClick={handleVoteDelSubmit} sx={{ color: 'red', borderColor: 'red' }}>
                  投票を削除
              </Button>
            }

          </Box>
        </Box>
      </Modal>
    </div>
  );
}