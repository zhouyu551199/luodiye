const express = require('express');
const fs = require('fs-extra');
const app = express();
const port = process.env.PORT || 3000;
const configPath = './config.json';

app.use(express.json());
app.use(express.static('public'));

// 获取当前按钮链接
app.get('/api/link', async (req, res) => {
    try {
        const config = await fs.readJson(configPath);
        res.json(config);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read config file' });
    }
});

// 更新按钮链接
app.post('/api/link', async (req, res) => {
    const { whatsappLink } = req.body;
    if (!whatsappLink) {
        return res.status(400).json({ error: 'whatsappLink is required' });
    }
    try {
        await fs.writeJson(configPath, { whatsappLink });
        res.json({ message: 'Link updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update config file' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});