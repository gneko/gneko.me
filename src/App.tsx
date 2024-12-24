import "@mantine/core/styles.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/700.css";
import { MantineProvider, createTheme, Container, Text, Button, Group, ActionIcon, Stack, Box, rem, Avatar, Paper } from "@mantine/core";
import { motion } from 'framer-motion';
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { IconBrandGithub, IconBrandWeibo, IconLanguage, IconUser } from '@tabler/icons-react';

const theme = createTheme({
  fontFamily: 'Space Grotesk, sans-serif, Noto Sans SC, sans-serif',
  defaultRadius: 'md',
  colors: {
    myColor: [
      "#e4f8ff",
      "#d4ecf9",
      "#aed5ec",
      "#84bdde",
      "#62a9d3",
      "#4a9ccd",
      "#3b96cb",
      "#2a82b4",
      "#1b74a2",
      "#006591"
    ]
  },
  primaryShade: 2,
  primaryColor: 'myColor',
});
// background-image: linear-gradient(to right, #868f96 0%, #596164 100%);
const backgroundGradient = 'linear-gradient(to right, #868f96 0%, #596164 100%)';
const boxBackgroundGradient = 'linear-gradient(60deg, #29323c 0%, #485563 100%)';

const ShowData = {
  i18n: {
    defaultLang: 'en',
    translations: {
      en: {
        name: "Grau Neko",
        about: 'About',
        blog: 'Blog',
        photos: 'Photos',
      },
      zh: {
        name: "灰一只猫",
        about: '关于',
        blog: '博客',
        photos: '摄影',
      }
    }
  },
  name: {
    key: 'name',
    i18nKey: 'name',
  },
  avatar: {
    src: '/avatar.jpg',
    alt: 'avatar',
    size: 150,
  },
  socials: [
    { platform: 'github', icon: IconBrandGithub, href: 'https://github.com/gneko' },
    { platform: 'weibo', icon: IconBrandWeibo, href: 'https://weibo.com' },
  ],
  navigation: [
    { key: 'photos', i18nKey: 'photos', href: 'https://photo.gneko.me' },
    { key: 'blog', i18nKey: 'blog', href: 'https://blog.gneko.me' },
  ],
  copyright: '2019-2024 © gneko.me'
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: Object.entries(ShowData.i18n.translations).reduce((acc, [lang, translation]) => ({
      ...acc,
      [lang]: { translation }
    }), {}),
    fallbackLng: ShowData.i18n.defaultLang,
    detection: {
      order: ['navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

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
          <Paper p="xl" radius="md"
            style={{
              position: 'relative',
              background: boxBackgroundGradient,
            }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Group justify="flex-end" mb={30}>
                <ActionIcon
                  variant="subtle"
                  onClick={toggleLanguage}
                  size="md"
                >
                  <IconLanguage size={20} />
                </ActionIcon>
              </Group>

              <Stack align="center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Avatar
                    mb={40}
                    size={ShowData.avatar.size}
                  >
                    {
                      ShowData.avatar.src && (
                        <img
                          src={ShowData.avatar.src}
                          alt={ShowData.avatar.alt}
                          height={ShowData.avatar.size}
                          width={ShowData.avatar.size}
                        />
                      ) || (
                        <IconUser size={ShowData.avatar.size} />
                      )
                    }
                  </Avatar>
                  <Text fw={700} size="xl" ta="center" c="white">
                    {t(ShowData.name.i18nKey)}
                  </Text>
                </motion.div>

                <Group gap={16}>
                  {ShowData.socials.map((social) => (
                    <motion.div
                      key={social.platform}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ActionIcon
                        variant="subtle"
                        size="xl"
                        radius="xl"
                        component="a"
                        href={social.href}
                      >
                        <social.icon />
                      </ActionIcon>
                    </motion.div>
                  ))}
                </Group>

                <Group gap={16}>
                  {ShowData.navigation.map((item) => (
                    <motion.div
                      key={item.key}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        component="a"
                        href={item.href}
                        variant="subtle"
                        color="gray"
                        size="sm"
                      >
                        {t(item.i18nKey)}
                      </Button>
                    </motion.div>
                  ))}
                </Group>
              </Stack>
            </motion.div>
          </Paper>
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
          {ShowData.copyright.toUpperCase()}
        </Text>
      </Box>
    </MantineProvider>
  );
}
