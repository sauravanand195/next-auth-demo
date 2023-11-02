"use client"
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogTitle, Grid, Typography } from "@mui/material"
import { getTodo } from "./actions/todo/getTodo"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function Home() {
  const handleSubmit = async () => {
    const res = await getTodo()
    console.log('res', res);
  }

  return (
    <div>
      Home Page
      <Button onClick={() => handleSubmit()}>
        Get Todo
      </Button>
      <Dialog open={true}>
        <Card sx={{ minWidth: 245 }}>
          <CardHeader title={<Typography component="div" sx={{ textAlign: 'center', fontWeight: 'bolder' }}>Edit Profile Info</Typography>} sx={{ textAlign: 'center' }} />
          <Grid container sx={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
            <CardMedia
              sx={{ width: 100, height: 100, borderRadius: '50%' }}
              image="/profile.jpg"
              title="green iguana"
            />
          </Grid>
          <CardContent>
            <Typography gutterBottom component="div" sx={{ color: '#1976d2', textAlign: 'center' }}>
              Edit picture
            </Typography>
            <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center' }}>
              Saurav Anand
            </Typography>
          </CardContent>
        </Card>
      </Dialog>
    </div>
  )
}
