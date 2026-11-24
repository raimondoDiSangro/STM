package main

import (
	_ "embed"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"time"
)

//go:embed game.html
var page []byte

func main() {
	ln, err := net.Listen("tcp", "127.0.0.1:47923") // fixed port keeps saves between sessions
	if err != nil {
		ln, err = net.Listen("tcp", "127.0.0.1:0")
		if err != nil {
			return
		}
	}
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Header().Set("Cache-Control", "no-store")
		w.Write(page)
	})
	go http.Serve(ln, mux)
	url := "http://" + ln.Addr().String() + "/"

	data := filepath.Join(os.Getenv("LOCALAPPDATA"), "SuperTeleMurgia")
	os.MkdirAll(data, 0755)
	args := []string{"--app=" + url, "--user-data-dir=" + data, "--window-size=1296,800", "--autoplay-policy=no-user-gesture-required", "--no-first-run", "--disable-features=Translate"}

	pf := os.Getenv("ProgramFiles")
	pf86 := os.Getenv("ProgramFiles(x86)")
	la := os.Getenv("LOCALAPPDATA")
	candidates := []string{
		filepath.Join(pf86, `Microsoft\Edge\Application\msedge.exe`),
		filepath.Join(pf, `Microsoft\Edge\Application\msedge.exe`),
		filepath.Join(pf, `Google\Chrome\Application\chrome.exe`),
		filepath.Join(pf86, `Google\Chrome\Application\chrome.exe`),
		filepath.Join(la, `Google\Chrome\Application\chrome.exe`),
		filepath.Join(pf, `BraveSoftware\Brave-Browser\Application\brave.exe`),
	}
	for _, c := range candidates {
		if _, err := os.Stat(c); err == nil {
			cmd := exec.Command(c, args...)
			start := time.Now()
			if cmd.Run() == nil {
				if time.Since(start) > 3*time.Second {
					return // the game window was closed: quit
				}
				time.Sleep(12 * time.Hour) // handed off to an already-open window: keep serving
				return
			}
			break
		}
	}
	// fallback: default browser, keep serving for a while
	exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	time.Sleep(12 * time.Hour)
}
