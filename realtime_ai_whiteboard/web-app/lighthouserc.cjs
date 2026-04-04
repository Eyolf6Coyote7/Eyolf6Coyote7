module.exports = {
  ci: {
    collect: {
      staticDistDir: './realtime_ai_whiteboard/web-app/dist',
      isSinglePageApplication: true,
      settings: {
        maxWaitForFcp: 30000,
        maxWaitForLoad: 45000,
        chromeFlags: ['--no-sandbox', '--disable-gpu', '--disable-software-rasterizer'],
      },
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.8 }],
        'categories:best-practices': ['error', { minScore: 0.8 }],
        'categories:seo': ['error', { minScore: 0.8 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
