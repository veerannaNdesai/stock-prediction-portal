from django.shortcuts import render
from .serializers import StockSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
import os
from django.conf import settings
from .utils import get_plot_url
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error, r2_score

# Create your views here.

class StockPredictionView(APIView):
    def post(self,request):
        serializer = StockSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']

            # fetching the data
            now = datetime.now()
            
            start = datetime(now.year-10,now.month,now.day)
            end = now
            df = yf.download(ticker,start,end)
            df.reset_index(inplace=True)

            #plot the figure
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Date,df['Close'])
            plt.title(f'closing price of {ticker}')
            plt.xlabel('Year')
            plt.ylabel('Closed Price')

            #save plot to file
            img_name = f'{ticker}_plot.png'
            plot_img = get_plot_url(img_name)

            #100 days moving average
            plt.switch_backend('AGG')
            ma100 = df.Close.rolling(100).mean()
            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label='Closing Price')
            plt.plot(ma100,'r',label='100 DMA')
            plt.title(f'closing price of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Closed Price')
            plt.legend()
            img_name = f'{ticker}_100_DMA.png'
            plot_100_DMA_img = get_plot_url(img_name)

            #200 days moving average
            plt.switch_backend('AGG')
            ma200 = df.Close.rolling(200).mean()
            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label='Closing Price')
            plt.plot(ma200,'r',label='200 DMA')
            plt.title(f'closing price of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Closed Price')
            plt.legend()
            img_name = f'{ticker}_200_DMA.png'
            plot_200_DMA_img = get_plot_url(img_name)

            #100 and 200 days moving average
            plt.switch_backend('AGG')
            ma100 = df.Close.rolling(100).mean()
            ma200 = df.Close.rolling(200).mean()
            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label='Closing Price')
            plt.plot(ma100,'r',label='100 DMA')
            plt.plot(ma200,'g',label='200 DMA')
            plt.title(f'closing price of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Closed Price')
            plt.legend()
            img_name = f'{ticker}_100_&_200_DMA.png'
            plot_100_200_DMA_img = get_plot_url(img_name)

            # Splitting data into Training & Testing datasets
            data_training = pd.DataFrame(df.Close[0:int(len(df)*0.7)])
            data_testing = pd.DataFrame(df.Close[int(len(df)*0.7): int(len(df))])

            # Scaling down the data between 0 and 1
            scaler = MinMaxScaler(feature_range=(0,1))

            # Load ML Model
            model = load_model('stock_prediction_model.keras')

            # Preparing Test Data
            past_100_days = data_training.tail(100)
            final_df = pd.concat([past_100_days, data_testing], ignore_index=True)
            input_data = scaler.fit_transform(final_df)

            x_test = []
            y_test = []
            for i in range(100, input_data.shape[0]):
                x_test.append(input_data[i-100: i])
                y_test.append(input_data[i, 0])
            x_test, y_test = np.array(x_test), np.array(y_test)

            # Making Predictions
            y_predicted = model.predict(x_test)

            # Revert the scaled prices to original price
            y_predicted = scaler.inverse_transform(y_predicted.reshape(-1, 1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()

            # Plot the final prediction
            plt.switch_backend('AGG')
            plt.figure(figsize=(12, 5))
            plt.plot(y_test, 'b', label='Original Price')
            plt.plot(y_predicted, 'r', label='Predicted Price')
            plt.title(f'Final Prediction for {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()
            plot_img_path = f'{ticker}_final_prediction.png'
            plot_prediction = get_plot_url(plot_img_path)

            # Model Evaluation
            # Mean Squared Error (MSE)
            mse = mean_squared_error(y_test, y_predicted)

            # Root Mean Squared Error (RMSE)
            rmse = np.sqrt(mse)

            # R-Squared
            r2 = r2_score(y_test, y_predicted)
            
            if df.empty:
                return Response({
                    'error' : 'The dataframe is not listed or you entered the wrong ticker.',
                    'status' : status.HTTP_404_NOT_FOUND
                })

            return Response({
                "status" : 'success',
                'ticker' : ticker,
                'plot_img' : plot_img,
                'plot_100_DMA_img' : plot_100_DMA_img,
                'plot_200_DMA_img' : plot_200_DMA_img,
                'plot_prediction' : plot_prediction,
                'plot_100_200_DMA_img': plot_100_200_DMA_img,
                'mse' : mse,
                'rmse' : rmse,
                'r2' : r2,
            })
        # return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)