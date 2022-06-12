import {
  React,
  useState,
  useEffect
} from 'react';

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Link,
  Typography,
  Box,
  List,
  ListItemText
} from '@mui/material';

import {
  styled,
} from '@mui/system';

import parseDateYYYYMMDD from '../../utils/parseDate';
import './JobOfferCard.css'

const CardContentNoPadding = styled(CardContent)(
  `
  &:last-child{
    padding-bottom: 0px;
  }
  `
);

const JobOfferCard = ({
  position,
  company,
  description,
  profilePictureURL,
  companyProfileURL,
  date,
  location,
  salary,
  requiredSkills,
  preferredSkills,
}) => {
  const [expand, setExpand] = useState();

  if (!profilePictureURL) {
    profilePictureURL = "#"
  }

  if (!companyProfileURL) {
    companyProfileURL = "#"
  }

  if (salary) {
    salary = "$" + salary
  }



  return (
    <div className='job-offer-card'>
      <Card>
        <CardHeader
          avatar={
            <Avatar alt={company} src={profilePictureURL} />
          }
          title={
            <Link
              href={companyProfileURL}
              underline="hover"
              variant='h6'
            >
              {company}
            </Link>
          }
          subheader={parseDateYYYYMMDD(date)}
        >
        </CardHeader>
        <CardContentNoPadding>
          <div className='job-offer-header-info'>
            <Typography variant='h5' sx={{ placeSelf: "center start" }}>{position}</Typography>
            <div>
              <Typography variant='subtitle1'>{salary}</Typography>
              <Typography variant='subtitle1'>{location}</Typography>
            </div>
          </div>

          <CardActions>
            <Button
              fullWidth
              variant='text'
              onClick={() => { setExpand(!expand) }}
            >
              Ver más
            </Button>
          </CardActions>

          <Collapse in={expand} timeout="auto" unmountOnExit>
            <Box className="job-offer-body-info" sx={{ paddingBottom: "16px" }}>
              <div className='job-offer-abilities'>
                <div>
                  <Typography variant='h6'>Habilidades requeridas:</Typography>
                  <List sx={{ padding: "0px 0px 8px 0px" }}>
                    {
                      requiredSkills && requiredSkills.map((skill) => (
                        <ListItemText>- {skill.name}</ListItemText>
                      ))
                    }
                  </List>
                </div>
                <div>

                  <Typography variant='h6'>Habilidades sugeridas:</Typography>
                  <List sx={{ padding: "0px 0px 8px 0px" }}>
                    {
                      preferredSkills && preferredSkills.map((skill) => (
                        <ListItemText>- {skill.name}</ListItemText>
                      ))
                    }
                  </List>
                </div>
              </div>

              <div>
                <Typography variant='body'>{description}</Typography>
              </div>
            </Box>
          </Collapse>

        </CardContentNoPadding>
      </Card>
    </div>
  );
};

export default JobOfferCard;