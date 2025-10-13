import { useEffect } from 'react';

const BotProtection = () => {
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    const botPatterns = [
      'bot',
      'crawler',
      'spider',
      'scraper',
      'curl',
      'wget',
      'python',
      'postman',
      'insomnia',
      'http',
      'slurp',
      'mediapartners',
      'adsbot',
      'bingbot',
      'googlebot',
      'yandexbot',
      'baiduspider',
      'facebookexternalhit',
      'twitterbot',
      'rogerbot',
      'linkedinbot',
      'embedly',
      'quora link preview',
      'showyoubot',
      'outbrain',
      'pinterest',
      'slackbot',
      'vkShare',
      'W3C_Validator',
      'redditbot',
      'applebot',
      'whatsapp',
      'flipboard',
      'tumblr',
      'bitlybot',
      'skypeuripreview',
      'nuzzel',
      'discordbot',
      'qwantify',
      'pinterestbot',
      'bitrix',
      'seopowersuite',
      'headlesschrome',
      'phantomjs',
      'selenium'
    ];

    const isBot = botPatterns.some(pattern => userAgent.includes(pattern));
    
    if (isBot) {
      window.location.href = 'https://ya.ru';
    }
  }, []);

  return null;
};

export default BotProtection;
