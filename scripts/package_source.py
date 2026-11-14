import os
import zipfile
import shutil

applet_dir = '/app/applet'
output_zip = '/app/applet/public/AXOLYT_Source_Code.zip'
artifact_zip = '/.aistudio/artifacts/brain/2bc4ff55-ce79-4bcf-a8f6-59f49df4bd92/AXOLYT_Source_Code.zip'

exclude_dirs = {'node_modules', '.git', 'dist', '.aistudio', '__pycache__'}
exclude_files = {'package-lock.json', 'AXOLYT_ORGANIC_ENERGY_App.zip', 'AXOLYT_Source_Code.zip'}

print("Packaging lightweight AXOLYT Source Code ZIP...")

with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(applet_dir):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for file in files:
            if file in exclude_files or file.endswith('.zip') or file.endswith('.pdf'):
                continue
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, applet_dir)
            archive_name = os.path.join('AXOLYT_ORGANIC_ENERGY', rel_path)
            zipf.write(full_path, archive_name)

print(f"Source code zip created at: {output_zip} ({os.path.getsize(output_zip) / (1024*1024):.2f} MB)")

try:
    shutil.copyfile(output_zip, artifact_zip)
    print(f"Copied to artifacts: {artifact_zip}")
except Exception as e:
    print(f"Artifact copy error: {e}")
