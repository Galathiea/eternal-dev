import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';

export default function BackendTest() {
  const [status, setStatus] = useState<string>('');
  const [timestamp, setTimestamp] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8000/api/health/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setStatus(data.status);
        setTimestamp(data.timestamp);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Backend Connection Test</h2>
      <Card className="max-w-md mx-auto">
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <CircularProgress />
            </div>
          ) : error ? (
            <Typography color="error" className="text-red-500">
              Error: {error}
            </Typography>
          ) : (
            <>
              <Typography variant="h6" className="mb-2">
                Status: {status}
              </Typography>
              <Typography variant="body1">
                Timestamp: {timestamp}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
