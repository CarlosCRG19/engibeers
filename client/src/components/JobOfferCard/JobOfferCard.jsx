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
  Box
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
}) => {
  const [expand, setExpand] = useState();

  if (!profilePictureURL) {
    profilePictureURL = "#"
  }

  if (!companyProfileURL) {
    companyProfileURL = "#"
  }

  return (
    <div className='joboffer-card'>
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
        />
        <CardContentNoPadding>
          <Typography variant='h5'>{position}</Typography>

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
            <Box sx={{ paddingBottom: "16px" }}>
              <Typography variant='body'>
                {description}
              </Typography>
            </Box>
          </Collapse>

        </CardContentNoPadding>
      </Card>
    </div>
  );
};

export default JobOfferCard;