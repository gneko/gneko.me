import "@mantine/core/styles.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/700.css";
import { MantineProvider, createTheme, Container, Text, Button, Group, ActionIcon, Stack, Box, rem } from "@mantine/core";
import { IconLanguage } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './i18n';

const theme = createTheme({
  fontFamily: 'Space Grotesk, sans-serif',
  primaryColor: 'gray',
  defaultRadius: 'md',
});

const backgroundGradient = 'linear-gradient(135deg, #2D3748 0%, #1A202C 100%)';

export default function App() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en');
  };

  return (
    <MantineProvider theme={theme}>
      <Box 
        style={{ 
          minHeight: '100vh',
          background: backgroundGradient,
          position: 'relative',
        }}
      >
        <Container size="xs" pt={50}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Group justify="flex-end" mb={30}>
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={toggleLanguage}
                size="md"
              >
                <IconLanguage style={{ width: rem(20), height: rem(20) }} />
              </ActionIcon>
            </Group>

            <Stack align="center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  component="img"
                  src="/avatar.svg"
                  alt="avatar"
                  style={{ 
                    width: rem(120),
                    height: rem(120),
                    marginBottom: rem(20)
                  }}
                />
                <Text fw={700} ta="center" c="white">
                  {i18n.language === 'zh' ? '杨二' : 'Yang Er'}
                </Text>
              </motion.div>

              <Stack align="center">
                <Text c="white" size="md" fw={500}>
                  {t('machine_repeats')}
                </Text>
                <Text c="white" size="md" fw={500}>
                  {t('human_creates')}
                </Text>
              </Stack>

              <Group gap={16}>
                {['github', 'weibo', 'twitter'].map((platform) => (
                  <motion.div
                    key={platform}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ActionIcon
                      variant="subtle"
                      color="gray"
                      size="md"
                      radius="xl"
                    >
                      <Box
                        component="img"
                        src={`/${platform}-icon.svg`}
                        alt={platform}
                        style={{ width: rem(20), height: rem(20) }}
                      />
                    </ActionIcon>
                  </motion.div>
                ))}
              </Group>

              <Group gap={16}>
                {[
                  { key: 'about', href: '#about' },
                  { key: 'blog', href: '#blog' },
                  { key: 'works', href: '#works' },
                ].map(({ key, href }) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      component="a"
                      href={href}
                      variant="subtle"
                      color="gray"
                      size="sm"
                    >
                      {t(key)}
                    </Button>
                  </motion.div>
                ))}
              </Group>
            </Stack>
          </motion.div>
        </Container>

        <Text 
          c="dimmed" 
          size="sm" 
          ta="center" 
          style={{ 
            position: 'absolute',
            bottom: rem(20),
            width: '100%'
          }}
        >
          2015-2024
        </Text>
      </Box>
    </MantineProvider>
  );
}
